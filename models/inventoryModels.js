const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    quantity: Number,
    unit: String
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;