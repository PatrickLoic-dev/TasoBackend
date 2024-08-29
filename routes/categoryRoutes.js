const express = require('express');
const authentification = require('../middlewares/authentification');
const { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/category/categoryController');

const router = express.Router();

// GET all categories
router.get('/categorie', authentification, getCategories)

// GET a specific category by ID
.get('/categories/:id', authentification, getCategoryById)

// POST a new category
.post('/categories', authentification, createCategory)

// PUT/update a category by ID
.put('/categories/:id', authentification, updateCategory)

// DELETE a category by ID
.delete('/categories/:id', authentification, deleteCategory);

module.exports = router;