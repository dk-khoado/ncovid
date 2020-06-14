var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();

const admin = require('./models/admin');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', '_layout');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

app.use(session({
  secret: '4D1FE6113A67635BA94CBFF6C2846',
  resave: true,
  saveUninitialized: true,
}))

app.use('/api', apiRouter);

app.get('/login', function (req, res, next) {

  res.render('login', { title: 'Quản lý cách ly tại nhà', layout: '_nullLayout' });
});

app.post('/login', function (req, res, next) {
  var adminModel = new admin();
  adminModel.login(req.body.username, req.body.password, (error, data) => {
    if (error) {
      res.redirect('/login');
    } else {
      console.log(data);
      if (data[0][0].success == 1) {
        req.session.login = "1";
        res.redirect('/');
        return;
      }
      res.redirect('/login');
    }
  })
});

app.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.redirect('/login');
});

app.use((req, res, next) => {

  console.log(req.session.login);
  if (!req.session.login) {
    res.redirect('/login');
  } else {
    next();
  }
});
app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.title = "Error";
  res.locals.activeTab = "Error";
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
