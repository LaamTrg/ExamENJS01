const express = require('express');
const router = express.Router();
const Product = require('../models/productModels');

router.get('/search', async (req, res) => {
    const { name, category, productId } = req.query;

    let searchCondition = {};

    if (name) {
        searchCondition.name = new RegExp(name, 'i');
    }

    if (category) {
        searchCondition.category = new RegExp(category, 'i');
    }

    if (productId) {
        searchCondition.productId = productId;
    }

    const products = await Product.find(searchCondition);

    res.send(products);
});

module.exports = router;