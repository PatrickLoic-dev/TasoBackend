const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    table: {
        type: String, // Change the type to String
        required: true
    },
    products: [{
       product : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity: {
        type: Number,
        required: true
    }}
],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'Non payé'
    }
},{timestamps : true});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
