const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

//Enable Corse
app.use(cors());
app.options('*',cors())

require('dotenv').config();


//Middleware 
app.use(bodyParser.json());
app.use(morgan('tiny'))


//Routers
const categoriesRoutes = require("./routers/categories");
const productsRoutes = require("./routers/products");
const usersRoutes = require("./routers/users");
const ordersRoutes = require("./routers/orders");

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);


const connectionString = process.env.CONNECTION_STRING;

mongoose.connect(connectionString,{
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