const { Category } = require("../models/category");
const {Product} = require("../models/product")
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get(`/`, async (req,res)=>{
    const productList = await Product.find().select('name image -_id');
    if(!productList){
        res.status(500).json({success:false})
    }
    res.send(productList);
})

router.get(`/:id`, async (req,res)=>{
    const product = await Product.findById(req.params.id).populate('category');
    if(!product){
        res.status(500).json({success:false})
    }
    res.send(product);
})

router.get(`/get/count`, async (req, res) => {
  const product = await Product.countDocuments();

  if (!product) {
    res.status(404).json({
      success: false,
      message: "can not count products",
    });
  }
  res.status(200).send({
    productCount: product,
  });
});

router.post(`/`, async (req,res)=>{
    const category = await Category.findById(req.body.category);
    if(!category){
        return res.status(400).send('Invalid Category');
    }
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand, // should be an array of strings
        price: req.body.price,
        category: req.body.category, // should be ObjectId string
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
    });
    product = await product.save();
    if(!product){
        return res.status(500).send('The product cannot be created');
    }
    res.send(product);
})

router.put(`/:id`, async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send('Invalid Product Id');
    }
    const category = await Category.findById(req.body.category);
    if(!category){
        return res.status(400).send('Invalid Category');
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand, // should be an array of strings
        price: req.body.price,
        category: req.body.category, // should be ObjectId string
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
      },
      {
        new: true,
      }
    );
  
    if (!product) {
      res.status(400).json({
        success: false,
        message: "The product cannot be updated!",
      });
    }
  
    res.send(product);
});

router.delete("/:id", (req, res) => {
    Product.findByIdAndDelete(req.params.id)
      .then((product) => {
        if (product) {
          return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "can not found product with provided id: " + req.params.id,
          });
        }
      })
      .catch((error) => {
        return res.status(404).json({
          success: false,
          message: "An Error Occurred: " + error,
        });
      });
});

module.exports = router;