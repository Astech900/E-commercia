
const Product = require('../models/product.js');
const flash = require('connect-flash');
const mongoose = require('mongoose')


//store product item on session
module.exports.storeCardItemOnSession = async (req, res, next) => {
    let { productId } = req.params;

    let productS = await Product.findById(productId);

    if (!productS) {
        req.flash('error', "Failed to add cart! please retry!");
        res.redirect(`/product/${productId}`);
    }

    if (!req.session.cart) req.session.cart = [];

    let d = req.session.cart.push({
        id: productS._id,
    });
    // console.log(req.session.cart)
    res.redirect(`/product/${productId}`);

}

module.exports.storeProductIemInSessionAndSearch = async (req, res, next) => {
    let d = req.session.cart
    let cartId = req.session.cart;
    if (!cartId) {
        req.flash("error", 'Please Add some item to Cart!');
        return res.redirect('/')
    }
    const ids = cartId.map(id => id.id);
    const objectId = ids.map(id => new mongoose.Types.ObjectId(id));

    let result = await Product.find({ _id: { $in: objectId } });

    // console.log(result);
    res.render('partials/dashboard.ejs', {cartItem : result})
}

//dropping cart item from session
module.exports.dropCartedItemFromSession = async(req,res,next)=>{
    let { productId } = req.params;
      let newCart = req.session.cart.filter(item => item.id !== productId);
      req.session.cart = newCart;
      res.redirect('/cart');
}