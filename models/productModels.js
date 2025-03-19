const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    code: String,
    category: String,
    units: [
        {
            unit: String,
            conversionRate: Number
        }
    ]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;