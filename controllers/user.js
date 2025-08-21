const User = require('../models/user.js');
const flash = require('connect-flash');
const Product = require('../models/product.js');


module.exports.serveSignupForm = (req, res, next) => {
    let csrfToken = req.csrfToken();
    res.render('partials/userForm.ejs', { csrfToken })
}


// store user registration information 

module.exports.storeUserRegisterData =  async (req, res, next) => {
    try {
        let { fullname, username, email, password } = { ...req.body.signup }
        // console.log(fullname, username, email, password);

        const newUser = new User({
            fullname, username, email
        });

        const registerUser = await User.register(newUser, password);

        // console.log(registerUser)

        if (!registerUser) {
            req.flash('error', 'Something Wrong Please Retry!');
          return  res.redirect("/user/signup");
        }

        req.login(registerUser, (err) => {
            if (err) { return next(err) }
            req.flash('success', 'congrats! you successfully registered');
            res.redirect('/')
        })

    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/user/signup')
    }

}



//serve login form 
module.exports.serveLoginForm = (req, res, next) => {
    res.render('partials/userForm.ejs');
}

//user login callback 
module.exports.loggedInCallback = async (req, res, next) => {
        // console.log(req.user)
        req.flash('success',`welcome back ${req.user.fullname}`)
        res.redirect('/');
    }



// user logout 
module.exports.userLogOut = (req,res,next)=>{
    if(!req.user){
        req.flash('error', 'You must logged in first!');
      return req.redirect('/user/login');
    }

    req.logout(function(err){
        if (err) {  return next(err) }
        req.flash('success','You Logged out Successfully!');
        res.redirect('/')
    });
}