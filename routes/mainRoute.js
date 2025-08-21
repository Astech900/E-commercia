const express = require('express');
const ExpreeError = require('../utils/ExpressError');
const asyncWrapper = require('../utils/asyncWrapper');
const Product = require("../models/product.js")
const flash = require('connect-flash');
const router = express.Router();



router.get('/', asyncWrapper(async (req, res, next) => {
    let allProdcut = await Product.find().populate('review');
    if (!allProdcut) {
        return next(ex[ExpreeError(401, "data not found")])
    }
    res.render('index.ejs', { allData: allProdcut })
}));

module.exports = router;



