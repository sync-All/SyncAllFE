var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose')
const passport = require('passport');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

require('dotenv').config()

var trackRouter = require('./routes/main_app/track');
var usersRouter = require('./routes/main_app/users')
let requestRouter = require('./routes/main_app/quoteRequests')
var dashboardRouter = require('./routes/main_app/dashboard');
var waitlistRouter = require('./routes/main_app/waitlist');
const unauthorizedRouter = require('./routes/main_app/unauthorized');
const paymentRouter = require('./routes/main_app/payment');

var adminAuthRouter = require('./routes/admin_routes/auth')
const adminUsersRouter = require('./routes/admin_routes/user')
const adminManageContentRouter = require('./routes/admin_routes/manage_content')
const adminManageDispute = require('./routes/admin_routes/dispute')


var app = express();

app.set('trust proxy', true);

var allowlist = ['http://localhost:5173','http://localhost:5174','https://sync-all-fe-1brn.vercel.app', 'https://sync-all-fe.vercel.app','https://sync-all-admin.vercel.app', 'https://www.syncallmusic.com','https://sync-all-admin-git-development-sync-alls-projects.vercel.app','https://sync-all-fe-git-development-sync-alls-projects.vercel.app', 'https://admin.syncallmusic.com']
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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

app.use(helmet());
app.use(limiter);

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
  await mongoose.connect( process.env.NODE_ENV == 'development' ? mongoTestString :  mongoString)
  return
}

require('./config/passport')(passport);

app.use(passport.initialize())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_ST));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res,next)=>{
  res.render('confirmEmail',{link : "rverververve"})
})

// Start Main Middlewares

app.use('/', waitlistRouter)
app.use('/api/v1/', trackRouter);
app.use('/api/v1/', paymentRouter);
app.use('/api/v1/', requestRouter);
app.use('/', usersRouter);
app.use('/', dashboardRouter);
app.use('/', unauthorizedRouter);

// End Main Middlewares


// Start Admin MiddleWares

app.use('/api/v1/', adminAuthRouter);
app.use('/api/v1/', adminUsersRouter);
app.use('/api/v1/', adminManageContentRouter);
app.use('/api/v1/', adminManageDispute);

// End Admin MiddleWares

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err)

  res.status(err.statusCode || 500).send(err.message);
});

module.exports = app;
