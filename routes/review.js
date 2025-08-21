const express = require('express');
const ExpreeError = require('../utils/ExpressError.js');
const asyncWrapper = require('../utils/asyncWrapper.js');
const Product = require("../models/product.js")
const flash = require('connect-flash');
const { route } = require('./mainRoute.js');
const { default: mongoose } = require('mongoose');
const Review = require("../models/review.js");
const reviewSchemaValidation = require("../utils/reviewSchemaV.js");
const { isLoggedIn } = require("../utils/middlewares.js");
const { isOwner } = require('../utils/middlewares.js');

const router = express.Router({ mergeParams: true });

const reviewController = require('../controllers/review.js')


const reviewSchemaValidators = (req, res, next) => {

    const { error } = reviewSchemaValidation.validate(req.body);

    if (error) {
        req.flash("error", `${error.message}`);
        return res.redirect(`/product/${req.params.productId}`)
    }
    next();
}




router.post("/:productId", 
    isLoggedIn, 
    reviewSchemaValidators, 
    asyncWrapper(reviewController.postReview) );


router.delete('/:productId/:reviewID/delete',
    isLoggedIn, 
    asyncWrapper(reviewController.deleteReview))

module.exports = router;