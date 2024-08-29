const express = require('express');
const Product = require('../models/product/products');
const authentification = require('../middlewares/authentification');
const { getProducts, createProduct, getProductByID, updateStock, addStock, removeStock, deleteProduct } = require('../controllers/product/productController');

const router = express.Router();

/* Ensembles des routes lié aux products */
router.get('/products', authentification, getProducts)

.post('/products', authentification, createProduct)

.get('/products/:id', authentification, getProductByID)


.put('/products/:id/add-quantity', authentification, addStock)

.put('/products/:id/remove-quantity', authentification, removeStock)

.delete('/products/:id', authentification, deleteProduct);

module.exports = router;