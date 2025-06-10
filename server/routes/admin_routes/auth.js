var express = require('express');
const router = express.Router()
const asynchandler = require('express-async-handler');
const adminAuth = require('../../controllers/admin/adminAuth');
const { loginLimiter } = require('../../utils/rateLimit');
require('dotenv').config()

// router.post('/admin_signup', asynchandler(adminAuth.admin_signup));

router.post('/admin_signin',loginLimiter, asynchandler(adminAuth.admin_signin));



module.exports = router