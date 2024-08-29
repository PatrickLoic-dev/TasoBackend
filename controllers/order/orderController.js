const Order = require('../../models/order/order');

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const createOrder = async (req, res) => {
    const order = new Order({
        // Add order properties here
    });

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateOrder = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
            return res.status(404).send('Order not found');
        }
        res.send(category);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteOrder =  async (req, res) => {
    try {
        await res.order.remove();
        res.json({ message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder,
}