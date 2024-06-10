var express = require('express');
const asyncHandler = require('express-async-handler')
const dashbordControllers = require('../controllers/dashboardControllers')

const router = express.Router()

router.get('/api/v1/dashboardhome/:userId',asyncHandler(dashbordControllers.dashboardcontrol) )

module.exports = router;