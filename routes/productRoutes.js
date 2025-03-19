const express = require('express');
const router = express.Router();
const Product = require('../models/productModels');

router.get('/search', async (req, res) => {
    const name = req.query.name;
    const category = req.query.category;

    let searchCondition = {};

    if (name) {
        searchCondition.name = new RegExp(name, 'i');
    }

    if (category) {
        searchCondition.category = new RegExp(category, 'i');
    }

    const products = await Product.find(searchCondition);

    res.send(products);
});

module.exports = router;