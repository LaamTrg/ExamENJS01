const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const config = require('./config');

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const productRoutes = require('./routes/productRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

app.use('/api/products', productRoutes);
app.use('/api/inventory', inventoryRoutes);

const PORT = 5000;
app.listen(PORT, function () {
    console.log('Server đang chạy trên ' + PORT);
});