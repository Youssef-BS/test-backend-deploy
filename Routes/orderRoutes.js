// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const {
    createOrder,
    getOrder,
    getAllOrders,
    getOrdersByUserId,
    updateOrder,
    deleteOrder
} = require('../Controller/orderCtrl');

// Create a new order
router.post('/', createOrder);

// Get a single order by ID
router.get('/:id', getOrder);

// Get all orders
router.get('/', getAllOrders);

// Get orders by User ID
router.get('/user/:userId', getOrdersByUserId);

// Update an existing order
router.put('/:id', updateOrder);

// Delete an order
router.delete('/:id', deleteOrder);

module.exports = router;
