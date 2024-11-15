const mongoose = require("mongoose");
const Schema = mongoose.Schema



const userTransactionSchema = new Schema({
    transactionType : {
     type : String,
     enum : ['Withdrawal', 'New Earning', 'Subscription']
    },
    transactionStatus : {
     type : String,
     enum : ['Completed', 'Pending']
    },
    amount : {
     type : Number
    },
    user : {
     type : Schema.Types.ObjectId,
     ref : "syncUser"
     },
 }, {timestamps : true})

 const transactionSchema = new Schema({
    transactionType : {
        type : String,
        enum : ['Withdrawal', 'New Earning', 'Subscription', 'Licensing', '']
    },
    transactionStatus : {
    type : String,
    enum : ['Completed', 'Pending', 'Failed']
    },
    userType : {
        type : String,
        enum : ['uploader', 'Sync User', 'Admin']
    },
    amount : {
        type : Number,
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : function(){
            return this.userType == 'uploader' ? 'user' : this.userType == 'syncUser' ? 'syncUser' : 'admin'
        }
    }
 }, {timestamps : true})


const transaction = mongoose.model('transaction',transactionSchema)


module.exports.transaction = transaction