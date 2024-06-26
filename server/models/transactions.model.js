const mongoose = require("mongoose");
const Schema = mongoose.Schema


const transactionSchema = new Schema({
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
    ref : "user"
    },
}, {timestamps : true})

const transaction = mongoose.model('transaction',transactionSchema)

module.exports.transaction = transaction