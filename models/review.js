const { required, ref } = require('joi');
const mongoose = require('mongoose');
const { type } = require('../utils/productSchemaV');
const Schema = mongoose.Schema;
const Product = require('../models/product.js');
const User = require('../models/user.js');


const reviewSchema = new Schema({
    review: {
        type: String,
        required: true,
        maxlength: 130,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    review_owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});


reviewSchema.post('findOneAndDelete', async function (delReview) {
  if (delReview) {
    console.log("Deleting review from products:", delReview._id);

    // Lazy require avoids circular dependency issue
    const Product = require("../models/product.js");

    await Product.updateMany(
      { review: delReview._id },
      { $pull: { review: delReview._id } }
    );

    console.log("Review removed from products");
  }
});


const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;