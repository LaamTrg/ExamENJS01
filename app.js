const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();
app.use(bodyParser.json());

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const productRoutes = require('./routes/productRoutes');
const quantityRoutes = require('./routes/quantityRoutes');

app.use('/api/products', productRoutes);
app.use('/api/quantity', quantityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));