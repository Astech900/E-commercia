const Product = require('../models/product.js');
const csrf = require('csurf');
const flash = require('connect-flash');

module.exports.serveProductForm = (req, res, next) => {
    let csrfToken = req.csrfToken();
    res.render("partials/productForm.ejs", { csrfToken });
}


// post product data 
module.exports.uploadProductInfo = async (req, res, next) => {
    let { name, price, des } = req.body.products;
    let images = req.files.map(file => ({
        url: file.path,
        filename: file.filename
    }));

    let newProduct = await new Product({
        product_name: name,
        product_price: price,
        product_description: des,
        product_image: images,
        product_owner: req.user._id

    });

    let saved = await newProduct.save();
    if (!newProduct) {
        req.flash('error', 'Sell posting failes please Retry again!!');
        return req.redirect("/product/new");
    }
    // console.log(saved);
    req.flash("success", "Your product has Ready for sell!");
    res.redirect("/");

}



// Retriving SIngle product data 
module.exports.singleProductData = async (req, res, next) => {
    let { id } = req.params
    let showProduct = await Product.findById(id).populate({ path: "review", populate: { path: 'review_owner' } }).populate('product_owner');
    if (!showProduct) {
        req.flash('error', "This Product not exists !");
        return res.redirect("/");
    }
    // console.log(showProduct)
    res.render('show.ejs', { product: showProduct })
}


//Update product data 
module.exports.serveProductForUpdate = async (req, res, next) => {
    let { productId } = req.params;
    let findEditData = await Product.findById(productId);
    // console.log(findEditData)
    res.render("partials/editProduct.ejs", { product: findEditData })
}


// post updated data 
module.exports.updateProductInfo = async (req, res, next) => {
    let { productId } = req.params;
    let { name, price, des } = req.body.products;

    let findProduct = await Product.findById(productId);
    let oldImage = findProduct.product_image;

    let images = req.files.map(file => ({
        url: file.path,
        filename: file.filename
    }));

    let updateProductDetails = {
        product_name: name,
        product_price: price,
        product_description: des,
        product_image: images.length > 0 ? images : oldImage
    };

    let updatess = await Product.findByIdAndUpdate(productId, updateProductDetails, { runValidators: true, new: true });

    req.flash('success', "Your Product Dada has Successfully Updated!")
    res.redirect(`/product/${productId}`);
}


// deleting product information 
module.exports.deleteProductData = async (req, res, next) => {
    let { productId } = req.params;

    let deletedData = await Product.findByIdAndDelete(productId);

    if (!deletedData) {
        req.flash('error', "failed to delete the product data!!");
        return res.redirect(`/product/${productId}`);
    }
    req.flash('success', 'Your Product data has Successfully Deleted!');
    res.redirect("/")

}
