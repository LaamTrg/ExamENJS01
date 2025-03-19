const express = require('express');
const router = express.Router();
const Quantity = require('../models/quantityModels');
const Product = require('../models/productModels');

router.post('/import', async (req, res) => {
    const { productId, quantity, unit } = req.body;

    let product = await Product.findById(productId);

    if (!product) {
        return res.status(404).send({ error: 'Product not found' });
    }

    const unitInfo = product.units.find(u => u.unit === unit);
    if (!unitInfo) {
        return res.status(400).send({ error: 'Invalid unit' });
    }
    const baseQuantity = quantity * unitInfo.conversionRate;

    let quantityRecord = await Quantity.findOne({ productId: product._id });
    if (quantityRecord) {
        quantityRecord.quantity += baseQuantity;
    } else {
        quantityRecord = new Quantity({ productId: product._id, quantity: baseQuantity, unit });
    }
    await quantityRecord.save();
    res.send(quantityRecord);
});

router.post('/export', async (req, res) => {
    const { productId, quantity, unit } = req.body;

    let product = await Product.findById(productId);

    if (!product) {
        return res.status(404).send({ error: 'Product not found' });
    }

    const unitInfo = product.units.find(u => u.unit === unit);
    if (!unitInfo) {
        return res.status(400).send({ error: 'Invalid unit' });
    }
    const baseQuantity = quantity * unitInfo.conversionRate;

    let quantityRecord = await Quantity.findOne({ productId: product._id });
    if (quantityRecord && quantityRecord.quantity >= baseQuantity) {
        quantityRecord.quantity -= baseQuantity;
        await quantityRecord.save();
        res.send(quantityRecord);
    } else {
        res.status(400).send({ error: 'Not enough inventory' });
    }
});

router.get('/check', async (req, res) => {
    const { productId, unit } = req.query;

    let product = await Product.findById(productId);

    if (!product) {
        return res.status(404).send({ error: 'Product not found' });
    }

    const unitInfo = product.units.find(u => u.unit === unit);
    if (!unitInfo) {
        return res.status(400).send({ error: 'Invalid unit' });
    }

    const quantityRecord = await Quantity.findOne({ productId: product._id });
    let quantity = 0;
    if (quantityRecord) {
        quantity = quantityRecord.quantity / unitInfo.conversionRate;
    }
    res.send({ productId: product.productId, quantity, unit });
});

module.exports = router;