const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require(`express-session`)
const MongoStore = require(`connect-mongo`)

// Import Configuration Items
const {DBHOST, DBPORT, DBNAME} = require(`./config/config`)

const indexRouter = require('./routes/web/index');
const loginRouter = require('./routes/web/auth');
const app = express();

// Set up Middleware
app.set('trust proxy', 1) 
app.use(session({  
  name: `sid`,  
  secret: 'keyboard cat', 
  resave: true,  
  saveUninitialized: false, 
  store: MongoStore.create({
    mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}` 
  }),
  cookie: { 
    httpOnly: true, 
    maxAge: 1000 * 60 * 60 * 7
  }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render(`404`)
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
