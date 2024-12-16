const mongoose = require("mongoose");
const Schema = mongoose.Schema

const uploaderActivitySchema = new Schema({

})

const userActivitySchema = new Schema({

})

const adminActivityLogSchema = new Schema({
    activityDate : {
        type : Date,
        default : Date.now(),
        required : true
    },
    action_taken : {
        type : String,
        required : true
    },
    performedBy : {
        type : String,
        required : true
    }
}, {timestamps : true})

const userActivity = mongoose.model('userActivity', userActivitySchema)
const uploaderActivity = mongoose.model('uploaderActivity', uploaderActivitySchema)
const adminActivityLog = mongoose.model('adminActivityLog', adminActivityLogSchema)

module.exports = {userActivity, uploaderActivity, adminActivityLog}