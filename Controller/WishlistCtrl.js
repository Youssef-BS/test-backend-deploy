const express = require('express');
const Product = require('../Models/Products');
const WishlistProduct = require('../Models/WishlistProduct');
const Wishlist = require('../Models/Wishlist'); 
const { Op } = require('sequelize');

const getWishlistsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const wishlists = await Wishlist.findAll({
      where: { UserId: userId },
      include: {
        model: WishlistProduct,
        include: {
          model: Product
        }
      }
    });
    res.status(200).json(wishlists);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};



const addProductToWishlist = async (req, res) => {
    try {
      const { UserId, ProductId, quantity } = req.body;
  
      // Find or create the wishlist for the user
      let wishlist = await Wishlist.findOne({ where: { UserId } });
      if (!wishlist) {
        wishlist = await Wishlist.create({ UserId, total: 0 });
      }
  
      // Find if the product already exists in the wishlist
      let wishlistProduct = await WishlistProduct.findOne({
        where: {
          WishlistId: wishlist.id,
          ProductId: ProductId
        }
      });
  
      if (wishlistProduct) {
        // Update the quantity if product exists in the wishlist
        wishlistProduct.quantity += quantity;
        await wishlistProduct.save();
      } else {
        // Add the product to the wishlist
        wishlistProduct = await WishlistProduct.create({
          WishlistId: wishlist.id,
          ProductId,
          quantity
        });
      }
  
      // Update the total price of the wishlist
      const product = await Product.findByPk(ProductId);
      wishlist.total += product.price * quantity;
      await wishlist.save();
  
      res.status(201).json(wishlistProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const updateProductQuantity = async (req, res) => {
    try {
      const { wishlistId, productId, quantity } = req.body;
  
      // Find the WishlistProduct by wishlistId and productId
      const wishlistProduct = await WishlistProduct.findOne({
        where: { WishlistId: wishlistId, ProductId: productId }
      });
  
      if (!wishlistProduct) {
        return res.status(404).json({ error: 'Wishlist product not found' });
      }
  
      const oldQuantity = wishlistProduct.quantity;
      wishlistProduct.quantity = quantity;
      await wishlistProduct.save();
  
      // Update the total price of the wishlist
      const product = await Product.findByPk(wishlistProduct.ProductId);
      const wishlist = await Wishlist.findByPk(wishlistProduct.WishlistId);
      wishlist.total += product.price * (quantity - oldQuantity); // Adjust the total based on quantity difference
      await wishlist.save();
  
      res.status(200).json(wishlistProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  
  const removeProductFromWishlist = async (req, res) => {
    try {
      const { wishlistId, productId, quantity } = req.body;
      console.log(productId)
  
      // Find the WishlistProduct by wishlistId and productId
      const wishlistProduct = await WishlistProduct.findOne({
        where: { WishlistId: wishlistId, ProductId: productId }
      });
  
      if (!wishlistProduct) {
        return res.status(404).json({ error: 'Wishlist product not found' });
      }
  
      // Update the total price of the wishlist
      const product = await Product.findByPk(wishlistProduct.ProductId);
      const wishlist = await Wishlist.findByPk(wishlistProduct.WishlistId);
      wishlist.total -= product.price * wishlistProduct.quantity; // Adjust the total based on the quantity
      await wishlist.save();
  
      await wishlistProduct.destroy();
  
      res.status(200).json({ message: 'Product removed from wishlist' });
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error.message)
    }
  };
  
 
  
  

module.exports = {
    getWishlistsByUser,
    addProductToWishlist,
    updateProductQuantity,
    removeProductFromWishlist,
  };