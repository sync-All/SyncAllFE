var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose')
const passport = require('passport');

require('dotenv').config()

var trackRouter = require('./routes/track');
var usersRouter = require('./routes/users')
var dashboardRouter = require('./routes/dashboard');
var waitlistRouter = require('./routes/waitlist');
const unauthorizedRouter = require('./routes/unauthorized')

var app = express();

var allowlist = ['http://localhost:5173', 'https://sync-all-fe-1brn.vercel.app', 'https://sync-all-fe.vercel.app']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {credentials : true, origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

// cors setup
app.use(cors(corsOptionsDelegate))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const mongoString = process.env.MONGO_CONNECT_STRING

main()
.then(()=> console.log('Connected to Database'))
.catch((err)=> console.log(err))

async function main(){
  await mongoose.connect(mongoString)
}

require('./config/passport')(passport);

app.use(passport.initialize())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', waitlistRouter)
app.use('/api/v1/', trackRouter);
app.use('/', usersRouter);
app.use('/', dashboardRouter);
app.use('/', unauthorizedRouter);


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
