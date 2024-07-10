const mongoose = require("mongoose");
const Schema = mongoose.Schema

const uploaderActivitySchema = new Schema({

})

const userActivitySchema = new Schema({

})

const userActivity = mongoose.model('userActivity', userActivitySchema)
const uploaderActivity = mongoose.model('uploaderActivity', uploaderActivitySchema)

module.exports = {userActivity, uploaderActivity}