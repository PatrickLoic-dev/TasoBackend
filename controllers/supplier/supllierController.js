const Supplier = require('../../models/supplier/supplier');

const getSuppliers = async (req, res, next) => {
    try {
        const suppliers = await Supplier.find({});
        if (!suppliers) {
            return res.status(404).send("No suppliers found");
        }
        res.send(suppliers);
    } catch (error) {
        res.status(500).send(error);
    }
}

const createSupplier = async (req, res, next) => {
    const supplier = new Supplier(req.body);
    try {
        await supplier.save();
        res.status(200).send(supplier);
    } catch (error) {
        res.status(400).send(error);
    }
}

const getSupplierByID = async (req, res, next) => {
    const { id } = req.params;

    try {
        const supplier = await Supplier.findById(id);
        if (!supplier) {
            return res.status(404).send("Supplier not found");
        }
        res.send(supplier);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateSupplier = async (req, res, next) => {
    try {
        const supplier = await Supplier.findByIdAndUpdate
            (req.params.id, req.body, { new: true });
        if (!supplier) {
            return res.status(404).send('Supplier not found');
        }
        res.send(supplier);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const deleteSupplier = async (req, res, next) => {
    try {
        const supplier = await Supplier.findByIdAndDelete(req.params.id);
        if (!supplier) {
            return res.status(404).send('Supplier not found');
        }
        res.send(supplier);
    } catch (error) {
        res.status(500).send(error);
    }
}


module.exports = {
    getSuppliers,
    createSupplier,
    getSupplierByID,
    updateSupplier,
    deleteSupplier
}