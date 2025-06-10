var express = require('express');
const router = express.Router()
const asynchandler = require('express-async-handler');
const kpi = require('../../utils/kpi')
const {checkAdmin, checkRoles} = require('../../utils/AuthenticateChecker')
const userControllers = require('../../controllers/admin/users')
const { BadRequestError } = require('../../utils/CustomError');
const multer = require("multer");
const upload = multer({ dest: "uploads/" , limits : {fileSize : 1048576, fieldNameSize: 300, files : 2}}).array("attachments");

router.get('/get_key_metrics/', checkRoles(['ContentAdmin','Admin','SuperAdmin']), asynchandler(async(req,res,next)=>{
    const filterReq = Number(req.query?.filter)
    if(filterReq  > 0 ){
        const kpiDetails = await kpi(filterReq)
        res.send({kpiDetails})
    }else{
        throw new BadRequestError('Invalid Filter request')
    }
}))

router.get('/allusers',checkRoles(['ContentAdmin', "SuperAdmin", "Admin"]), asynchandler(userControllers.allUsers));

router.get('/userSearch', checkAdmin, asynchandler(userControllers.userSearch))
router.put('/suspenduser', checkAdmin, asynchandler(userControllers.suspendUser))
router.put('/activateuser', checkAdmin, asynchandler(userControllers.activateUser))

router.get('/allAdmins',checkAdmin, asynchandler(userControllers.allAdmin))

router.post('/send-user-email',checkRoles(['ContentAdmin', "SuperAdmin", "Admin"]),asynchandler(upload), asynchandler(userControllers.sendUserEmail))

module.exports = router

