const { string } = require('joi');
const mongoose = require('mongoose');
const { type } = require('../utils/productSchemaV');
const Schema = mongoose.Schema;
const Review = require("../models/review.js");
const User = require('./user.js');

const productSchema = new Schema({
    product_name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
    },
    product_price: {
        type: Number,
        required: true,
        min: 1
    },
    product_image: [{
        url: String,
        filename: String

    }],
    product_description: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 160
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    product_owner: {
        type: Schema.Types.ObjectId,
        ref : "User"
    },
    review : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review"
            
        }
    ]
});


productSchema.post("findOneAndDelete", async(product)=>{
    if(product){
        await Review.deleteMany({_id : {$in : product.review}});
        console.log('All Related Data is Deleted Including Product Reviews')
    }
});

let Product = mongoose.model("Product", productSchema);
module.exports = Product;
