const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require(cors);

app.use(cors());
app.options('*',cors())

require("dotenv/config");


//Middleware 
app.use(bodyParser.json())
app.use(morgan('tiny'))


//Routers
const api = process.env.API_URL;

const categoriesRoutes = require('./routers/categories')
app.use(`${api}/categories`, categoriesRoutes)

const productsRoutes = require('./routers/products')
app.use(`${api}/products`, productsRoutes)

const usersRoutes = require('./routers/users')
app.use(`${api}/users`, usersRoutes)

const ordersRoutes = require('./routers/orders')
app.use(`${api}/orders`, ordersRoutes)




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