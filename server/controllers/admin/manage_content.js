const { default: mongoose } = require("mongoose")
const { adminActivityLog } = require("../../models/activity.model")
const { track, rejectedTrack } = require("../../models/track.model")
const { BadRequestError } = require("../../utils/CustomError")
const { attachNewNotification } = require("../userControllers")

const contentReview = async(req,res,next)=>{
    try {
        const {actionTaken,contentId,reason} = req.query
        const allowedActions = ['Rejected', 'Approved']
        if(!allowedActions.includes(actionTaken)){
            throw new BadRequestError('Invalid action taken')
        }
        const trackDetails = await track.findById(contentId).populate('user').exec()
        if(trackDetails.uploadStatus == actionTaken){
            throw new BadRequestError('Action has already been taken previously')
        }
        if(actionTaken === 'Rejected'){
            if(!reason){
                throw new BadRequestError('No reason attached for rejection, kindly review')
            }
            const newRejectedTack = new rejectedTrack({
                contentId,
                reason,
                performedBy : req.user.id
            })
            await newRejectedTack.save()
            attachNewNotification({title : `Oops Looks Like Your Song ~${trackDetails.trackTitle}~ Was Rejected`, message : reason, userId : trackDetails.user._id,linkto :'/dashboard/tracks'})
        }
        if(actionTaken === "Approved"){
            attachNewNotification({title : `Your Track ~${trackDetails.trackTitle}~ has been Approved 🎉`, message : '', userId : trackDetails.user._id, linkto :'/dashboard/tracks'})
        }
        updateTrack = track.findByIdAndUpdate(contentId, {uploadStatus : actionTaken}).exec()
        const activityLog = new adminActivityLog({
            activityDate : Date.now(),
            action_taken : `${actionTaken} trackTitle : ${trackDetails.trackTitle}, which was uploaded by ${trackDetails.user.email}`,
            performedBy : req.user.id
        })
        await activityLog.save()
        res.status(201).send(`Post has been ${actionTaken} successfully`)
    } catch (error) {
        console.log(error)
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
        console.log(req.body)
        const {_id} = req.body
        if(!mongoose.Types.ObjectId.isValid(_id)){
            throw new BadRequestError("Track not available")
        }
        const trackDetails = await track.findByIdAndUpdate(_id,{...req.body},{new : true}).exec()
        if(!trackDetails){
            throw new BadRequestError("Track could not be updated, contact dev team")
        }
        const activityLog = new adminActivityLog({
            activityDate : Date.now(),
            action_taken : `Updated trackTitle : ${trackDetails.trackTitle}, `,
            performedBy : req.user.id
        })
        await activityLog.save()
        res.send({message : "TrackDetails uploaded successfully", trackDetails})
    } catch (error) {
        console.log(error)
        throw new BadRequestError(error.message)
    }
}
module.exports = {contentReview, searchContent, contentUpdate}