const { default: mongoose } = require("mongoose")
const { BadRequestError } = require("../../utils/CustomError")
const { adminActivityLog } = require("../../models/activity.model")
const Admin = require('../../models/usermodel').admin
const Dispute = require('../../models/dashboard.model').dispute
const Ticket = require('../../models/dashboard.model').ticket

const assignAdmin = async(req,res,next)=>{
    const {adminId,disputeId} = req.query
    if(!mongoose.Types.ObjectId.isValid(adminId) || !mongoose.Types.ObjectId.isValid(disputeId)){
        throw new BadRequestError('Bad request, review call') 
    }
    try {
       const adminInfo = await Admin.findById(adminId).exec()
       const disputeInfo = await Dispute.findById(disputeId).exec()
       const newActivity = new adminActivityLog({action_taken : `Dispute assigned to ${adminInfo.name}`, performedBy : req.user.name,})
        await newActivity.save()
        const updateDispute =
         await Dispute.findByIdAndUpdate(disputeId,{assignedTo : adminId, $push : {activityLog : newActivity._id}}).exec()
        console.log(updateDispute)
        res.send(`Dispute successfully assigned to ${adminInfo.name}`)
       
    } catch (error) {
        console.log(error)
        throw new BadRequestError(`An error occured, contact dev team, ${JSON.stringify(error)}`)
    }
}

const setDisputeStatus = async(req,res,next)=>{
    const {status, disputeId} = req.query
    const allowedStatusValues = ['Pending', 'Resolved', 'Rejected']
    if(!allowedStatusValues.includes(status) || !disputeId){
        throw new BadRequestError('Missing parameters or Invalid Dispute Status')
    }
    try {
        const updateDispute = await Dispute.findByIdAndUpdate(disputeId, {status : status}).exec()
        res.send(`Status updated successfully, ${status}`)

    } catch (error) {
        throw new BadRequestError('An error occurred, Contact dev team')
    }
}

const searchTicket = async(req,res,next)=>{
    try {
        const {filter} = req.query
        if(!filter){
             throw new BadRequestError('filter parameter missing')
        }
        const tickets = await Ticket.aggregate([
            {
                $lookup: {
                    from: "users", // The name of the `user` collection
                    localField: "user",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $unwind: "$userDetails" // Deconstruct array returned by $lookup
            },
            {
                $match: {
                    $or: [
                        { tickId: { $regex: filter, $options: "i" } }, // filter by tickId
                        { "userDetails.username": { $regex: filter, $options: "i" } }, // filter by username
                        { "userDetails.name": { $regex: filter, $options: "i" } } // Search by fullname
                    ]
                }
            },
            {
                $project: {
                    tickId: 1,
                    status: 1,
                    user: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    "userDetails.username": 1,
                    "userDetails.name": 1,
                    "userDetails.email" : 1,
                }
            }
        ]);
        return res.status(200).json(tickets);
    }catch (error) {
        console.log(error)
        throw new BadRequestError(error.message)
    }
}

module.exports = {assignAdmin, setDisputeStatus,searchTicket}