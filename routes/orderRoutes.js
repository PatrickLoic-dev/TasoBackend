const express = require('express');
const Order = require('../models/order/order');
const authentification = require('../middlewares/authentification');
const { getOrders, createOrder, deleteOrder, updateOrder } = require('../controllers/order/orderController');

const router = express.Router();

// GET all orders
router.get('/order', authentification, getOrders)

// GET a specific order
.get('/order/:id', authentification, getOrder, (req, res) => {
    res.json(res.order);
})

// CREATE a new order
.post('/order', authentification, createOrder)

// UPDATE an existing order
.patch('/order/:id', authentification, updateOrder)

// DELETE an order
.delete('/order/:id', authentification, getOrder, deleteOrder)

async function getOrder(req, res, next) {
    let order;
    try {
        order = await Order.findById(req.params.id);
        if (order == null) {
            return res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.order = order;
    next();
}

module.exports = router;