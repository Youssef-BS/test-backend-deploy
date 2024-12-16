// orderCtrl.js
const Order = require('../Models/Order');
const OrderProduct = require('../Models/Orderproduct');
const Product = require('../Models/Products');
const User = require('../Models/User');
const nodemailer = require('nodemailer')

// Create a new order
async function createOrder(req, res) {
    const { UserId, orderDate, orderStatus, paymentMethod, orderCost, subTotal, total, deliveryAddress, comment, products } = req.body;
    console.log(UserId)
    try {
        const order = await Order.create({
            UserId,
            orderDate,
            orderStatus,
            paymentMethod,
            orderCost,
            subTotal,
            total,
            deliveryAddress,
            comment
        });

        // Add products to the order
        if (products && products.length > 0) {
            for (const product of products) {
                await OrderProduct.create({
                    OrderId: order.id,
                    ProductId: product.id,
                    quantity: product.quantity
                });
            }
        }

        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get order by ID
async function getOrder(req, res) {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id, {
            include: [
                { model: User },
                { model: Product, through: OrderProduct }
            ]
        });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get all orders
async function getAllOrders(req, res) {
    try {
        const orders = await Order.findAll({
            include: [
                { model: User },
                { model: Product, through: OrderProduct }
            ]
        });
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get orders by User ID
async function getOrdersByUserId(req, res) {
    const { userId } = req.params;
    try {
        const orders = await Order.findAll({
            where: { UserId: userId },
            include: [
                { model: User },
                { model: Product, through: OrderProduct }
            ]
        });
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders for user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Update an order
async function updateOrder(req, res) {
    const { id } = req.params;
    const { orderDate, orderStatus, paymentMethod, orderCost, subTotal, total, deliveryAddress, comment , email , firstname , lastname } = req.body;
    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.orderDate = orderDate ? orderDate : order.orderDate;
        order.orderStatus = orderStatus ? orderStatus: order.orderStatus;
        order.paymentMethod = paymentMethod ? paymentMethod : order.paymentMethod;
        order.orderCost = orderCost ? orderCost : order.orderCost;
        order.subTotal = subTotal ? subTotal : order.subTotal;
        order.total = total ? total : order.total;
        order.deliveryAddress = deliveryAddress ? deliveryAddress : order.deliveryAddress;
        order.comment = comment ? comment : order.comment;

        await order.save();

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
            text: `Hello , ${firstname +" " +lastname} Your order was updated Check Your order status.`,
          };
      
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
              res.status(500).json({ error: 'Error sending email' });
            } else {
              console.log('Email sent:', info.response);
              res.json({ message: 'Email sent successfully' });
            }
          });

        res.json({ message: 'Order updated successfully', order });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


async function deleteOrder(req, res) {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await order.destroy();
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createOrder,
    getOrder,
    getAllOrders,
    getOrdersByUserId,
    updateOrder,
    deleteOrder
};
