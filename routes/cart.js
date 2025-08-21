const express = require('express');
const ExpreeError = require('../utils/ExpressError.js');
const asyncWrapper = require('../utils/asyncWrapper.js');
const Product = require("../models/product.js")
const flash = require('connect-flash');
const { route } = require('./mainRoute.js');
const { default: mongoose } = require('mongoose');
const router = express.Router({ mergeParams: true });


const cartController = require('../controllers/cart.js')




router.post("/add/:productId", asyncWrapper(cartController.storeCardItemOnSession));



router.get("/", asyncWrapper(cartController.storeProductIemInSessionAndSearch));


router.get("/drop/:productId" , asyncWrapper(cartController.dropCartedItemFromSession));





module.exports = router;