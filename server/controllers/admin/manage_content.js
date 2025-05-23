const { default: mongoose } = require("mongoose")
const { adminActivityLog } = require("../../models/activity.model")
const { track, rejectedTrack, ownershipTransfer } = require("../../models/track.model")
const { BadRequestError } = require("../../utils/CustomError")
const Dashboard = require('../../models/dashboard.model').dashboard
const { attachNewNotification, getUserInfo, checkForExistingOwnershipByUser, checkTrackStatus } = require("../userControllers")

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

const contentTransferOwnership = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const allowedTrackOwnerRoles = ['Music Uploader', 'ContentAdmin']
    const requiredItems = ["trackIds","newTrackOwnerId", "comment"]
    try {
      const { trackIds, newTrackOwnerId,comment} = req.body;

      const missingItems = requiredItems.filter(item => Object.keys(req.body).includes(item))

      if (missingItems){
        throw new BadRequestError('Invalid or missing parameters')
      }

      const invalidTracks =  await checkTrackStatus(trackIds)

      if (invalidTracks) {
        throw new BadRequestError('Tracks must be approved before they can be transferred to another user');
      }

      const newTrackOwner = await getUserInfo({ _id: newTrackOwnerId });
      if (!newTrackOwner || !allowedTrackOwnerRoles.includes(newTrackOwner.role)) {
        throw new BadRequestError('Invalid new trackOwner id provided');
      }
  
      const ownedTracks = await checkForExistingOwnershipByUser(trackIds, newTrackOwnerId);
      if (ownedTracks) {
        throw new BadRequestError('One or more track entries already belong to this user');
      }
  
      await Promise.all(trackIds.map(trackId => {
        return Promise.all([
          Dashboard.findOneAndUpdate(
            { totalTracks: { $in: [trackId] } },
            { $pull: { totalTracks: trackId } },
            { new: true, session }
          ).exec(),
  
          track.findOneAndUpdate(
            { _id: trackId },
            {
              userRole: newTrackOwner.role,
              user: newTrackOwner._id
            },
            { new: true, session }
          ).exec()
        ]);
      }));

    //   const newownershipTransfer = new ownershipTransfer({
    //     trackIds,
    //     from
    //   })
  
      await session.commitTransaction();
      session.endSession();
  
      res.status(200).json({ success: true, message: "Tracks transferred successfully" });
  
    } catch (error) {
      console.error(error);
      await session.abortTransaction();
      session.endSession();
      next(new BadRequestError(error.message || 'An error occurred while transferring ownership'));
    }
};
  
module.exports = {contentReview, searchContent, contentUpdate,contentTransferOwnership}