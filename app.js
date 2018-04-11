const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const upload = require('express-fileupload');
let app = express();

const url = 'mongodb://adwz007:700zwda@ds119268.mlab.com:19268/schooldb';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error to  db:'));
db.once('open', function () {
  // we're connected!
  console.log("Connected correctly to server");
});

var emailRouter = require('./routes/email.route');

app.use(logger('dev'));
//app.use(bodyParser.json({limit:'10mb'}));
//app.use(bodyParser.urlencoded({limit:'10mb', extended: true }));
app.use(cookieParser());
app.use(upload());

app.use('/email', emailRouter);

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
