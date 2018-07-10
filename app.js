var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');


var compression = require('compression');
var helmet = require('helmet');

var bodyParser = require('body-parser');
var session = require('express-session');
var favicon = require('serve-favicon');
var expressValidator = require('express-validator');
var mongo = require('mongodb');
var db = require('monk')(process.env.MONGODB_URI); //---

var indexRouter = require('./routes/index');
var editorRouter = require('./routes/editor');

var app = express();
app.use(helmet());

app.locals.moment = require('moment');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(compression());




app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));


app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use('/', indexRouter);
app.use('/editor', editorRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;