const express = require('express');
const ExpreeError = require('../utils/ExpressError');
const asyncWrapper = require('../utils/asyncWrapper');
const Product = require("../models/product.js")
const flash = require('connect-flash');
const { route } = require('./mainRoute.js');
const Joi = require('joi');
const productSchemaValidation = require('../utils/productSchemaV.js');
const { storage } = require('../cloudConfig.js');
const csrf = require('csurf');
const multer = require('multer')
const upload = multer({ storage })
const { isLoggedIn } = require('../utils/middlewares.js')
const { isOwner } = require('../utils/middlewares.js');



const router = express.Router({ mergeParams: true });
const csrfProtection = csrf({ cookie: true });

const productSchmeValidator = (req, res, next) => {

  const { error } = productSchemaValidation.validate(req.body);
  if (error) {
    req.flash("error", `${error.message}!`);
    return res.redirect("/product/new");
  }
  next();
}


const productController = require('../controllers/product.js')



router.route("/new")
.get(csrfProtection, productController.serveProductForm)
.post(
  isLoggedIn,
  upload.array(['products[images]']),
  productSchmeValidator,
  csrfProtection,
  asyncWrapper(productController.uploadProductInfo));


router.get("/:id", asyncWrapper(productController.singleProductData));


router.route("/:productId/edit")
.get(
   isLoggedIn,
   isOwner, 
   asyncWrapper(productController.serveProductForUpdate))
.put(
  isLoggedIn,
  isOwner,
  productSchmeValidator,
  upload.array('products[images]'),
  asyncWrapper(productController.updateProductInfo)
);


router.delete("/:productId/delete", 
  isLoggedIn, 
  isOwner, 
  asyncWrapper(productController.deleteProductData));





module.exports = router;