const Order = require('../models/order.js');
const Product = require('../models/product.js');
const flash = require('connect-flash');

// retriving order my order and recieved order from  the databases
module.exports.userDashboard = async(req,res,next)=>{
    let {userId} = req.params;
    let productOwner  = req.user._id;
    let orderedProduct = null;
    console.log(productOwner)

    if(!productOwner){
        req.flash('error', 'Please Logged in!');
        return res.redirect('/user/login');
    }

    let myOrders = await Order.find({ order_by: productOwner })
  .populate('ordered_prodcut')
  .populate('order_by')
  .populate('product_owner');

let receivedOrders = await Order.find({ product_owner: productOwner })
  .populate('ordered_prodcut')
  .populate('order_by')
  .populate('product_owner');

   
    res.render('partials/myDashboard.ejs', {myOrder : myOrders || [] , recievedOrder : receivedOrders || null });
}



//store the ordered product 
module.exports.storeOrder = async (req, res, next) => {
    let { productId } = req.params;
    let orderProduct = await Product.findById(productId);
    if (!orderProduct) {
        req.flash('error', 'Sorry, the product you ordered is currently not available.');
        res.redirect('/')

    }
    let orderBy = req.user._id;
    let newOrder = new Order({
        ordered_prodcut: orderProduct._id,
        order_by: orderBy,
        product_owner: orderProduct.product_owner
    });
    let d = await newOrder.save();
    console.log(d)
    req.flash('success', "Order placed successfully!");
    res.redirect('/');
}