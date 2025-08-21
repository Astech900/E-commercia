const express = require('express');
const ExpreeError = require('../utils/ExpressError.js');
const asyncWrapper = require('../utils/asyncWrapper.js');
const Product = require("../models/product.js")
const flash = require('connect-flash');
const { route } = require('./mainRoute.js');
const { default: mongoose } = require('mongoose');
const User = require('../models/user.js');
const userSchemaValidation = require("../utils/userSchemaV.js");
const router = express.Router({ mergeParams: true });
const passport = require('passport')
const csrf = require('csurf');
const { invalid } = require('joi');
const csrfProtection = csrf({ cookie: true });
// const {saveRedirectUrl} = require('../utils/middlewares.js')


const userController = require('../controllers/user.js')

const userValidators = async (req, res, next) => {
    const { error } = userSchemaValidation.validate(req.body);

    if (error) {
        req.flash('error', `${error.message}`);
        return res.redirect('/user/signup');
    }
    next();
}
router.route('/signup')
    .get(csrfProtection,
        userController.serveSignupForm)
    .post(userValidators,
        userController.storeUserRegisterData);


        
router.route("/login")
    .get(userController.serveLoginForm)
    .post(
        passport.authenticate('local',
            {
                failureRedirect: '/user/login',
                failureFlash: "invalid username or password retry!",
            }),
        asyncWrapper(userController.loggedInCallback));




router.get('/logout', userController.userLogOut)


module.exports = router;