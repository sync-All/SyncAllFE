const { adminActivityLog } = require("../../models/activity.model")
const { track } = require("../../models/track.model")
const { BadRequestError, unauthorizedError } = require("../../utils/CustomError")

const contentReview = async(req,res,next)=>{
    try {
        const {actionTaken, contentId} = req.query
        const allowedActions = ['Rejected', 'Approved']
        if(!allowedActions.includes(actionTaken)){
            throw new BadRequestError('Invalid action taken')
        }
        const trackDetails = await track.findById(contentId).populate('user').exec()
        console.log(trackDetails)
        if(trackDetails.uploadStatus == actionTaken){
            throw new BadRequestError('Action has already been taken previously')
        }
        updateTrack = track.findByIdAndUpdate(contentId, {uploadStatus : actionTaken}).exec()
        const activityLog = new adminActivityLog({
            activityDate : Date.now(),
            action_taken : `${actionTaken} trackTitle : ${trackDetails.trackTitle}, which was uploaded by ${trackDetails.user.email}`,
            performedBy : req.user.name
        })
        await activityLog.save()
        res.status(201).send(`Post has been ${actionTaken} successfully`)
    } catch (error) {
        throw new BadRequestError(error.message)
        
    }
}

const searchContent = async(req,res,next)=>{
    try {
        const {filter} = req.query
        const regex = new RegExp(filter, 'i');
        const tracks =  await track.find({$or : [
            {trackTitle : {$regex : regex}},
            {mainArtist : {$regex : regex}},
        ]}).populate('user','name email').exec()
        res.send(tracks)
    } catch (error) {
        console.log(error)
        throw new BadRequestError('An error Occured, contact dev team')
    }
    
}

const contentUpdate = async(req,res,next)=>{
    try {
        const {_id} = req.body
        await track.findByIdAndUpdate(_id,{...req.body},{new : true}).exec()
        res.send("TrackDetails uploaded successfully")
    } catch (error) {
        console.log(error)
        throw new BadRequestError("Bad request, please check documentation")
    }
}
module.exports = {contentReview, searchContent, contentUpdate}