const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar : {
        type: String,
        default: "https://www.esquire.co.za/images/noimg.png"
    },
},{timestamps : true});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;