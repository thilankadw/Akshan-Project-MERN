require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3090;

connectDB();

app.use(express.json());

app.use(cors(corsOptions));

app.use('/test', (req,res) => {
    res.send('Hello World');
})

app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/product', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/order', require('./routes/orderRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

mongoose.connection.once('open', () => {
    console.log('connected to mongodb');
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`)); 
})

mongoose.connection.on('error', err => {
    console.log(err);
})