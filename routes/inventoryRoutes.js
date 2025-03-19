const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventoryModels');
const Product = require('../models/productModels');

router.post('/import', async (req, res) => {
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    const unit = req.body.unit;

    const product = await Product.findById(productId);
    const unitInfo = product.units.find(u => u.unit === unit);
    const baseQuantity = quantity * unitInfo.conversionRate;

    let inventory = await Inventory.findOne({ productId: productId });
    if (inventory) {
        inventory.quantity = inventory.quantity + baseQuantity;
    } else {
        inventory = new Inventory({ productId: productId, quantity: baseQuantity, unit: unit });
    }
    await inventory.save();
    res.send(inventory);
});

router.post('/export', async (req, res) => {
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    const unit = req.body.unit;

    const product = await Product.findById(productId);
    const unitInfo = product.units.find(u => u.unit === unit);
    const baseQuantity = quantity * unitInfo.conversionRate;

    let inventory = await Inventory.findOne({ productId: productId });
    if (inventory && inventory.quantity >= baseQuantity) {
        inventory.quantity = inventory.quantity - baseQuantity;
        await inventory.save();
        res.send(inventory);
    } else {
        res.send({ error: 'Không đủ tồn kho' });
    }
});

router.get('/check', async (req, res) => {
    const productId = req.query.productId;
    const unit = req.query.unit;

    const product = await Product.findById(productId);
    const unitInfo = product.units.find(u => u.unit === unit);

    const inventory = await Inventory.findOne({ productId: productId });
    let quantity = 0;
    if (inventory) {
        quantity = inventory.quantity / unitInfo.conversionRate;
    }
    res.send({ productId: productId, quantity: quantity, unit: unit });
});

module.exports = router;