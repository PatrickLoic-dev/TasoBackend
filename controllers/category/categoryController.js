const Category = require('../../models/category/category');    
//Retrieves all categories from the database.

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    } catch (error) {
        res.status(500).send(error);
    }
}

//Retrieves a category by its ID from the database.

const getCategoryById  =  async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).send('Category not found');
        }
        res.send(category);
    } catch (error) {
        res.status(500).send(error);
    }
}

//Creates a new category in the database.

const createCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).send(category);
    } catch (error) {
        res.status(500).send(error);
    }
}

//Updates a category in the database.

const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
            return res.status(404).send('Category not found');
        }
        res.send(category);
    } catch (error) {
        res.status(500).send(error);
    }
}

//Deletes a category from the database.

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).send('Category not found');
        }
        res.send(category);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}