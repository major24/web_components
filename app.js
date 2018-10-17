var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var wcHelloWorldRouter = require('./routes/wc-hello-world');
var wcSimplePopupRouter = require('./routes/wc-simple-popup');
var wcCounterRouter = require('./routes/wc-counter');
var wcTextboxPostcodeRouter = require('./routes/wc-textbox-postcode');
var wcYesNoSelectorRouter = require('./routes/wc-yes-no-selector');
var CustomEventSimpleTextAreaRouter = require('./routes/custom-event-simple-textarea');
var wcComp1WithEventsRouter = require('./routes/wc-comp1-with-events');
var wcShopRouter = require('./routes/wc-shop');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/wc-hello-world', wcHelloWorldRouter);
app.use('/wc-simple-popup', wcSimplePopupRouter);
app.use('/wc-counter', wcCounterRouter);
app.use('/wc-textbox-postcode', wcTextboxPostcodeRouter);
app.use('/wc-yes-no-selector', wcYesNoSelectorRouter);
app.use('/custom-event-simple-textarea', CustomEventSimpleTextAreaRouter);
app.use('/wc-comp1-with-events', wcComp1WithEventsRouter);
app.use('/wc-shop', wcShopRouter);

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
