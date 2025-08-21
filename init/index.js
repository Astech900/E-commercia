const Product = require('../models/product.js');
const allData = require('./data.js')
const mongoose = require('mongoose');
const dbsUrl = 'mongodb://127.0.0.1:27017/E-commercia'



main().then(res =>{
    console.log('Databse Conncted Successfully!');
}).catch(err =>{
    // next(err);
    console.log(err)
})

async function main() {
    await mongoose.connect(dbsUrl);
    
}


async function findUser(params) {

    let d = await Product.find().populate("product_owner");
    console.log(d)
    
}
findUser();

async function initializeProductOwner() {
  // Set product_owner for all products where that field is missing or null
  await Product.updateMany(
    { product_owner: { $exists: false } },  // filter documents missing "product_owner"
    { $set: { product_owner: "6885f7a96f28e8a3d6069a70" } } // set the field value
  );

  console.log("product_owner field initialized for existing documents.");
}

initializeProductOwner().catch(console.error);




// const intializeDatabase = async () =>{
    
//     // await Product.deleteMany({});
    
//     let d = await  Product.insertMany(allData);
//     console.log(d)



//    console.log('Data initianlize Successfully');



// }
// intializeDatabase();