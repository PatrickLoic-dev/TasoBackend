const express = require('express');
const supplierController = require('../controllers/supplierController');
const authentification = require('../middlewares/authentification');
const { getSuppliers, getSupplierByID, createSupplier, updateSupplier, deleteSupplier } = require('../controllers/supplier/supllierController');


const router = express.Router();

// GET all suppliers
router.get('/supplier',authentification, getSuppliers)

// GET a specific supplier by ID
.get('/supplier/:id',authentification, getSupplierByID)

// POST a new supplier
.post('/supplier',authentification, createSupplier)

// PUT/update a supplier by ID
.put('/supplier/:id',authentification, updateSupplier)

// DELETE a supplier by ID
.delete('/supplier/:id',authentification, deleteSupplier)

module.exports = router;