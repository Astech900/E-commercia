const Review = require('../models/review.js');
const Product = require('../models/product.js');
const flash = require('connect-flash');


// store review 
module.exports.postReview =
    async (req, res, next) => {
        let { productId } = req.params;
        let { rating, review } = req.body.products;
        let reviwedProduct = await Product.findById(productId);
        let reviewOwner = req.user._id;

        let newReview = await new Review({
            review: review,
            rating: rating,
            review_owner: reviewOwner
        });

        reviwedProduct.review.push(newReview._id);
        let savedReview = await newReview.save();
        let p = await reviwedProduct.save();

        // console.log(savedReview);
        // console.log(p);
        req.flash("success", "Your Reviews has sumitted!")
        res.redirect(`/product/${productId}`)
    }



    // Deleting reivew from the databases
    module.exports.deleteReview = async (req, res, next) => {
    let { productId, reviewID } = req.params;

    let findReviews = await Review.findById(reviewID);
    if (!findReviews) {
        req.flash('error', 'Review not exist!');
      return  res.redirect(`/product/${productId}`)
    }

     await Review.findByIdAndDelete(reviewID);
    
    console.log('deleted review')
    res.redirect(`/product/${productId}`)
}