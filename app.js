var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var mongoose = require('mongoose');
var db = require('./db');
//var streamr = require('./streamr');
var index = require('./routes/index');
var test = require('./routes/test');
var users = require('./routes/users');
var query = require('./routes/query');
var fetch = require('./routes/fetch');
var productview = require('./routes/productview');
//var updater = require('./updater');
//Test connection to mongoose
/* var mongosettings = {
  url: 'mongodb://localhost',
  options: {
  }
};
mongoose.connect(mongosettings.url);
*/
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/test', test);
app.use('/users', users);
app.use('/query', query);
app.use('/fetch', fetch);
app.use('/productview', productview);
// Test
//updater.gsUpdater.categories();
//console.log(db.gsCategories.allData("help"));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
