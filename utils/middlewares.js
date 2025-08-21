const Product = require('../models/product.js');
const reviewSchemaValidation = require('../utils/reviewSchemaV.js')


module.exports.isLoggedIn = (req, res, next) => {

    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl
        console.log(req.session)
        console.log(req.session)
        req.flash('error', 'Please Log in first');
        return res.redirect('/user/login')
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let { productId } = req.params
    let checkingProduct = await Product.findById(productId);
    if (!checkingProduct.product_owner.equals(req.user._id)) {
        req.flash('error', 'You are not Owner of this product.!');
        return res.redirect(`/`)
    }
    next();
}


// module.exports.saveRedirectUrl = async (req, res, next) => {
//     if (req.session.redirectUrl) {
//         res.locals.redirectUrls = req.session.redirectUrl;
//     }
//     next()

// }




















