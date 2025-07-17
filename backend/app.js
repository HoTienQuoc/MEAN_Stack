const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");


// Enable Cors
app.use(cors());



// Middleware
app.use(express.json()); // thay bodyParser.json()


//Logs
app.use(morgan("tiny"));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);


// Routers
const categoriesRoutes = require("./routers/categories");
const productsRoutes = require("./routers/products");
const usersRoutes = require("./routers/users");
const ordersRoutes = require("./routers/orders");

const api = process.env.API_URL || '/api';

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

const connectionString = process.env.CONNECTION_STRING;

mongoose.connect(connectionString, {
  dbName: 'eshop-database'
})
.then(() => console.log("Database connection is ready ..."))
.catch((err) => console.log(err));

app.listen(3000, () => {
  console.log(api);
  console.log("Server is running http://localhost:3000");
});
