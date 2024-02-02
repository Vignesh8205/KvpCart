const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser')
const path = require('path')
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config({path:path.join(__dirname,"config/config.env")});


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:['http://localhost:5173'],
    methods:["POST","GET","PUT","DELETE"],
    credentials:true
}))
app.use('/uploads', express.static(path.join(__dirname,'uploads') ) )

const products = require('./routes/product')
const auth = require('./routes/auth')
const order = require('./routes/order')
const payment = require('./routes/payment')

app.use('/api/v1/',products);
app.use('/api/v1/',auth);
app.use('/api/v1/',order);
app.use('/api/v1/',payment);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'))
    })
}

app.use(errorMiddleware)

module.exports = app;