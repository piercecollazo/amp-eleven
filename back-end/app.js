var createError     = require('http-errors');
var express         = require('express');
var path            = require('path');
var cookieParser    = require('cookie-parser');
var logger          = require('morgan');
var mongoose        = require('mongoose');
var passport        = require('passport')
var cors            = require('cors')

var indexRouter     = require('./routes/index');
var usersRouter     = require('./routes/users/users');
var adminRouter     = require('./routes/admin/admin');
var eventRouter     = require('./routes/event/event');
var cartRouter      = require('./routes/cart/cart');

// var flash           = require('connect-flash');

// var expressValidator= require('express-validator');

var cartMiddleware  = require('./routes/cart/utils/cartMiddleware');

var Category        = require('./routes/event/models/Category');

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true})
    .then( ()=>{
        console.log('MONGODB CONNECTED')
    })
    .catch( err => console.log(`ERROR: ${err}`))

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(flash());
app.use(passport.initialize());
require('./passport/passport') (passport);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

//Make user object available for EJS Files/Administrator/Categories
app.use(function(req, res, next) {
    res.locals.user         = req.user;

    // res.locals.error        = req.flash("error");
    // res.locals.error_msg    = req.flash("error_msg");
    // res.locals.success_msg  = req.flash("success_msg");

    next();
})

app.use(function (req, res, next){
    Category.find({})
        .then( categories =>{

            res.locals.categories = categories
            
            next()
        })
        .catch( error => {
            return next(error)
        })
})

app.use(cartMiddleware);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/event', eventRouter);
app.use('/cart',  cartRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;