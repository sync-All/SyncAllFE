var express = require('express');
const router = express.Router()

router.get('/unauthorized',(req,res,next)=> {
    res.status(401).json('Unauthorized')
})

module.exports =router