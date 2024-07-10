const mongoose = require("mongoose");
const Schema = mongoose.Schema


const uploaderTransactionSchema = new Schema({
   transactionType : {
    type : String,
    enum : ['Withdrawal', 'New Earning']
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
    ref : "uploader"
    },
}, {timestamps : true})

const userTransactionSchema = new Schema({
    transactionType : {
     type : String,
     enum : ['Withdrawal', 'New Earning']
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

const uploaderTransaction = mongoose.model('uploaderTransaction',uploaderTransactionSchema)

const userTransaction = mongoose.model('userTransaction',userTransactionSchema)

module.exports.uploaderTransaction = uploaderTransaction

module.exports.userTransaction = userTransaction