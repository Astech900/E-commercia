const { string, ref } = require('joi');
const mongoose = require('mongoose');
const { type } = require('../utils/productSchemaV');
const Schema = mongoose.Schema;
const Review = require("../models/review.js");
const User = require('./user.js');
const Product = require('../models/product.js')




const orderSchema = new Schema({
    ordered_prodcut : {
        type : Schema.Types.ObjectId,
        ref : 'Product'
    },
    order_by : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    product_owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    placed_date : {
        type : Date,
        default : Date.now()
    }
});


const Order = mongoose.model("Order",orderSchema);


module.exports = Order;