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
var adminAuthRouter = require('./routes/admin_routes/auth')
const adminUsersRouter = require('./routes/admin_routes/user')
let requestRouter = require('./routes/quoteRequests')
var dashboardRouter = require('./routes/dashboard');
var waitlistRouter = require('./routes/waitlist');
var stripWebhookRouter = require('./webhooks/stripe')
const unauthorizedRouter = require('./routes/unauthorized')
const paymentRouter = require('./routes/payment')
var app = express();

var allowlist = ['http://localhost:5173', 'https://sync-all-fe-1brn.vercel.app', 'https://sync-all-fe.vercel.app','https://sync-all-admin.vercel.app', 'https://www.syncallmusic.com']
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
const mongoTestString = process.env.MONGO_TEST_CONNECT_STRING

try {
  main()
} catch (error) {
  console.log(err)
}

async function main(){
  await mongoose.connect( process.env.NODE_ENV == 'test' ? mongoTestString :  mongoString)
  return
}

require('./config/passport')(passport);

app.use(passport.initialize())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res,next)=>{
  res.render('confirmEmail',{link : "rverververve"})
})

app.use('/', waitlistRouter)
app.use('/api/v1/', trackRouter);
app.use('/api/v1/', paymentRouter);
app.use('/api/v1/', requestRouter);
app.use('/api/v1/', adminAuthRouter);
app.use('/api/v1/', adminUsersRouter);
app.use('/', stripWebhookRouter);
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

  res.status(err.statusCode || 500).send(err.message);
});

module.exports = app;
