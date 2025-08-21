if (process.env.NODE_ENV != "production") {
  require('dotenv').config()
}

// console.log(process.env.CLOUD_NAME);
// console.log(process.env.CLOUD_API_SECRET);
// // console.log(process.env.CLOUD_URL);
// console.log(process.env.CLOUD_API_KEY);

const express = require('express');
const app = express();
var cors = require('cors');
const path = require('path');
const engine = require('ejs-mate');
const { default: mongoose } = require('mongoose');
const ExpreeError = require('./utils/ExpressError.js');
const dbsUrl = 'mongodb://127.0.0.1:27017/E-commercia';
const session = require('express-session');
const flash = require('connect-flash');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');


// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })




const mainRoutes = require('./routes/mainRoute.js');
const productRoute = require("./routes/product.js");
const reviewRoutes = require("./routes/review.js")
const cartRoutes = require("./routes/cart.js");
const userRoutes = require('./routes/user.js');
const User = require('./models/user.js');
const orderRoutes = require('./routes/order.js');
const port = 5000;



main().then(res => {
  console.log('Databse Conncted Successfully!');
}).catch(err => {
  console.log(err)
})

async function main() {
  await mongoose.connect(dbsUrl);

}

app.use(cors({
  origin: 'http://localhost:3000/',
  optionsSuccessStatus: 200
}));

app.engine('ejs', engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "./public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));


const sessionOption = {
  secret: 'ecommerciasite',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days in milliseconds
  }
}

app.use(session(sessionOption));
app.use(cookieParser());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
  res.locals.currentUser = req.user || null
  res.locals.carted = req.session.cart;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});


app.use("/", mainRoutes);
app.use("/product", productRoute);
app.use("/cart", cartRoutes);
app.use("/review", reviewRoutes);
app.use("/user", userRoutes);
app.use("/order",orderRoutes)



app.use((err, req, res, next) => {
  console.log(err)
  let { status = 500, message = "Something went wrong. Please try again!" } = err;
  res.status(status).render("./error/errorHandler.ejs", { status, message });
});


app.listen(port, () => {
  console.log(`Server Runned on Port ${port}`)
})