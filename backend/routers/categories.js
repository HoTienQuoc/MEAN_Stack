const {Catagory} = require("../models/category");
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const catagoryList = await Catagory.find();

    if(!catagoryList){
        res.status(500).json({success: false})
    }
    res.send(catagoryList);
})

module.exports = router;