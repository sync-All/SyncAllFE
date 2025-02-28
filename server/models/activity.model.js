const mongoose = require("mongoose");
const Schema = mongoose.Schema

const uploaderActivitySchema = new Schema({

})

const userActivitySchema = new Schema({

})

const adminActivityLogSchema = new Schema({
    activityDate : {
        type : Date,
        default : Date.now()
    },
    action_taken : {
        type : String,
        required : true
    },
    performedBy : {
        type : Schema.Types.ObjectId,
        ref : 'admin'
    }
}, {timestamps : true})

const userActivity = mongoose.model('userActivity', userActivitySchema)
const uploaderActivity = mongoose.model('uploaderActivity', uploaderActivitySchema)
const adminActivityLog = mongoose.model('adminActivityLog', adminActivityLogSchema)

module.exports = {userActivity, uploaderActivity, adminActivityLog}