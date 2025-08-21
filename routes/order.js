const express = require('express');
const ExpreeError = require('../utils/ExpressError.js');
const asyncWrapper = require('../utils/asyncWrapper.js');
const Product = require("../models/product.js")
const flash = require('connect-flash');
const { route } = require('./mainRoute.js');
const { default: mongoose } = require('mongoose');
const { isLoggedIn } = require('../utils/middlewares.js')
const router = express.Router({ mergeParams: true });
const Order = require("../models/order.js");
const User = require('../models/user.js');

const orderController = require('../controllers/order.js');



router.get("/:userId/dashboard",isLoggedIn, asyncWrapper(orderController.userDashboard));

router.post("/:productId", isLoggedIn, asyncWrapper(orderController.storeOrder));



module.exports = router;