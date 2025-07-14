const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

//Middleware 
app.use(bodyParser.json())
app.use(morgan('tiny'))


require("dotenv/config");

const api = process.env.API_URL;

app.get(`${api}/products`, async (req,res)=>{
    const productList = await Product.find();
    if(!productList){
        res.status(500).json({success:false})
    }
    res.send(productList);
})

app.post(`${api}/products`, (req,res)=>{
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    });
    product.save().then((createdProduct=>{
        res.status(201).json(createdProduct)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    });
    res.send(product);
})

mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
})
        .then(()=>console.log("Database connection is ready ..."))
        .catch((err)=>console.log(err));

app.listen(3000, ()=>{
    console.log(api);
    console.log("Server is running http://localhost:3000");
})