const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const { type } = require('../utils/productSchemaV');
const { required, string } = require('joi');




const userSchema = new Schema({
    fullname : {
        type : String,
        required : true,
        maxLength : 80,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        // match: [/^[A-Za-z]\w*\.[a-z]{2,6}\.[a-z]{2,4}$/, "Please Enter a valid email address"]
    }
})


userSchema.plugin(passportLocalMongoose);


const User = mongoose.model("User",userSchema);




module.exports = User;
