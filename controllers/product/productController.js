const express = require('express');
const Product = require('../../models/product/products');
const authentification = require('../../middlewares/authentification');


//Retrieves all products and sends them as a response.

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({}).populate('category');
        if (!products) {
            return res.status(404).send("No products found");
        }
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
}

//Creates a new product and sends it as a response.
const createProduct = async (req, res, next) => {
    const { category, name } = req.body;
    const productCode = `${category[0].toUpperCase()}${name.slice(0, 3).toUpperCase()}`;

    const product = new Product({
        ...req.body,
        productCode,
    });

    try {
        await product.save();
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
}

//Retrieves a specific product by ID and sends it as a response.
const getProductByID = async (req, res, next) => {
    const { id } = req.params;

    try {
        const product = await Product
            .findById(id)
            .populate('category');

        if (!product) {
            return res.status(404).send("Product not found");
        }

        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
}

//Adds stock to a product and sends a success message as a response.
const addStock = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send("Product not found");
        }

        product.quantity += quantity;
        await product.save();

        res.send("Quantity added successfully");
    } catch (error) {
        res.status(500).send(error);
    }
}

//Removes stock from a product and sends a success message as a response.
const removeStock = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send("Product not found");
        }

        product.quantity -= quantity;
        await product.save();

        res.send("Quantity removed successfully");
    } catch (error) {
        res.status(500).send(error);
    }
}

//Deletes a product and sends a success message as a response.
const deleteProduct =  async (req, res, next) =>{
    const productId = req.params.id;
    
    try {
        const product = await User.findByIdAndDelete(productId);
        
        if(!product) return res.status(404).send('Product not found');
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    getProducts,
    createProduct,
    getProductByID,
    addStock,
    removeStock,
    deleteProduct
}