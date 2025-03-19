const mongoose = require('mongoose');

const quantitySchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    quantity: Number,
    unit: String
});

module.exports = mongoose.model('Quantity', quantitySchema);