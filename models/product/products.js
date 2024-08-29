const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productCode: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    productPhoto : {
        type: String,
        default: "https://www.esquire.co.za/images/noimg.png"
    },
},{timestamps : true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;