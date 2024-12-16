const Cart = require('../Models/Cart');
const Product = require('../Models/Products');
const CartProduct = require('../Models/CartProduct');
const asyncHandler = require('express-async-handler');
const { generatePDFReceipt } = require('./pdf');
const path = require('path');
const nodemailer = require('nodemailer');
const stripe = require("stripe")("sk_test_51PjN2iP46Jm8DMlLkImZf7IqUUGVN1ikTJB8ptIemi0NXhwnGFLUCUhOZ9SR7h1rLVfySlIzIHpALpxJopimiTuf00B0z6ca4y")
const fs = require('fs');

// Add product to cart
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.params.userId;
  console.log(userId,productId,quantity)
  try {
    // Check if the product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the cart already exists or create a new one
    let cart = await Cart.findOrCreate({
      where: { UserId: userId },
      defaults: { totale: 0, UserId: userId }
    });
    cart = cart[0];
    let cartProduct = await CartProduct.findOne({
      where: { CartId: cart.id, ProductId: productId }
    });

    if (cartProduct) {
      // Update quantity if the product is already in the cart
      await cartProduct.update({ quantity: cartProduct.quantity + quantity });
    } else {
      // Create a new cart product if it doesn't exist
      cartProduct = await CartProduct.create({
        CartId: cart.id,
        ProductId: productId,
        quantity: quantity
      });
    }
    // Update the total price in the Cart model
    const updatedTotal = cart.totale + (product.price * quantity);
    await cart.update({ totale: updatedTotal });

    res.status(201).json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Failed to add product to cart' });
  }
});


// Retrieve all items in the cart
const getCartItems = asyncHandler(async (req, res) => {
  const cartId = req.params.cartId; // Assuming cartId is passed as a parameter

  try {
    const cartItems = await CartProduct.findAll({
      where: { cartId },
      include: [Product]
    });

    res.json(cartItems);
  } catch (error) {
    console.error('Error retrieving cart :', error);
    res.status(500).json({ message: 'Failed to retrieve cart ' });
  }
});
const getCart = asyncHandler(async (req, res) => {
    const userId = req.params.userId; // Assuming cartId is passed as a parameter
  
    try {
      const cart = await Cart.findAll({
        where: { UserId : userId},
        include: [{
          model :CartProduct,
        include : [
          {
            model : Product,
          }
        ]}]
      });
  
      res.json(cart);
    } catch (error) {
      console.error('Error retrieving cart items:', error);
      res.status(500).json({ message: 'Failed to retrieve cart items' });
    }
  });
// Update quantity of a product in the cart
const updateCartItemQuantity = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const cartId = req.params.cartId; // Assuming cartId is passed as a parameter

  try {
    // Check if the cart product exists
    let cartProduct = await CartProduct.findOne({
      where: { CartId:cartId, ProductId:productId }
    });

    if (!cartProduct) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Update the quantity
    await cartProduct.update({ quantity:quantity });

    // Update the total price in the Cart model
    const product = await Product.findByPk(productId);
    const cart = await Cart.findByPk(cartId);

    if (!product || !cart) {
      return res.status(404).json({ message: 'Product or cart not found' });
    }

    const cartItems = await CartProduct.findAll({
      where: { cartId }
    });

    let updatedTotal = 0;
    cartItems.forEach((item) => {
      updatedTotal += item.quantity * product.price;
    });

    await cart.update({ totale: updatedTotal });

    res.json(cartProduct);
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    res.status(500).json({ message: 'Failed to update cart item quantity' });
  }
});

// Remove a product from the cart
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const cartId = req.params.cartId; // Assuming cartId is passed as a parameter

  try {
    // Check if the cart product exists
    const cartProduct = await CartProduct.findOne({
      where: { cartId, productId }
    });
    if (!cartProduct) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }
    // Delete the cart product
    await cartProduct.destroy()
    // Update the total price in the Cart model
    const product = await Product.findByPk(productId);
    const cart = await Cart.findByPk(cartId);
    if (!product || !cart) {
      return res.status(404).json({ message: 'Product or cart not found' });
    }
    const cartItems = await CartProduct.findAll({
      where: { cartId }
    });

    let updatedTotal = 0;
    cartItems.forEach((item) => {
      updatedTotal += item.quantity * product.price;
    });

    await cart.update({ total: updatedTotal });

    res.json( cart);
  } catch (error) {
    console.error('Error removing product from cart:', error);
    res.status(500).json({ message: 'Failed to remove product from cart' });
  }
});


const paymentCart = async (req, res) => {
  const { products, email } = req.body; // Assume email is part of the request

  const lineItems = products.map((product) => ({
    price_data: {
      currency: 'eur',
      product_data: {
        name: product.Product.title,
        images: [product.Product.image],
      },
      unit_amount: product.Product.price * 100,
    },
    quantity: product.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3001/success',
      cancel_url: 'http://localhost:3001/cancel',
    });
    const dirPath = path.join(__dirname, 'receipts');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(__dirname, 'receipts', `receipt_${session.id}.pdf`);
    generatePDFReceipt({ total: lineItems.reduce((sum, item) => sum + (item.price_data.unit_amount / 100) * item.quantity, 0), products }, filePath);
   
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', 
      port: 465, 
      secure: true, 
      auth: {
          user: 'wassimna68@gmail.com',
          pass: 'blavsuxydmqtqtjc' 
      },
      tls: {
          rejectUnauthorized: false,
      },
  });
    const mailOptions = {
      from: 'wassimna68@gmail.com',
      to: email, 
      subject: 'Your Receipt',
      text: 'Thank you for your purchase. Please find your receipt attached.',
      attachments: [
        {
          filename: `receipt_${session.id}.pdf`,
          path: filePath,
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
      } else {
        console.log('Email sent:', info.response);
        res.json({ id: session.id, message: 'Email sent successfully' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  updateCartItemQuantity,
  removeFromCart,
  getCart , 
  paymentCart  
};
