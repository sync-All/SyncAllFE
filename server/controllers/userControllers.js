const { notification } = require('../models/usermodel');
const { BadRequestError } = require('../utils/CustomError');

const User = require('../models/usermodel').uploader;
const SyncUser = require('../models/usermodel').syncUser;
const Admin = require('../models/usermodel').admin;
const Track = require('../models/track.model').track;


const findUserAndUpdate = async(searchParams, updateOptions)=>{
    try {
        const update = await Promise.any([User.findOneAndUpdate(searchParams,updateOptions,{new : true}).select('name email role').then(user => user || Promise.reject()),SyncUser.findOneAndUpdate(searchParams,updateOptions, {new : true}).select('name email role').then(user => user || Promise.reject())])
        if(!update){
            throw new BadRequestError('User not found')
        }
        return update
    } catch (error) {
        console.log(error)
        throw new BadRequestError(error.message)
    }
}

const getUserInfo = async(searchParams,options="")=>{
    // options object includes {populate, select ....}
    try{
        const userInfo = await Promise.any([ User.findOne(searchParams).populate(options.populate || "").select(options.select || "").then(user => user || Promise.reject()), SyncUser.findOne(searchParams).select(options.select || "").populate(options.populate || "").then(user => user || Promise.reject()), Admin.findOne(searchParams).select(options.select || "").populate(options.populate || "").then(user => user || Promise.reject())])
        return userInfo
    }catch(error){
        if (error instanceof AggregateError) {
            // Handle all promises failing
            return null
        } else {
            throw new BadRequestError(error.message || "Error occurred while fetching user info");
        }
    }
}

const createNewMusicUploader = async({name,email,hashpassword,role,userType})=>{
    const allowedRoleType = ['Music Uploader']
    const allowedUserType = ['Individual', 'Company']
    if(!allowedRoleType.includes(role)) throw new BadRequestError('role type not allowed')
    if(!allowedUserType.includes(userType)) throw new BadRequestError('User type not allowed')
    try {
        const newUserData = new User({
            name,
            email : email.toLowerCase(),
            password : hashpassword,
            role,
            userType,
        })
        await newUserData.save()
        return newUserData
    } catch (error) {
        console.log(error)
        throw new BadRequestError(error.message || 'Error occured while creating your account')
    }
}

const createNewSyncUser = async({name,email,hashpassword,role,userType})=>{
    const allowedRoleType = ['Sync User']
    const allowedUserType = ['Individual', 'Company']
    if(!allowedRoleType.includes(role)) throw new BadRequestError('role type not allowed')
    if(!allowedUserType.includes(userType)) throw new BadRequestError('User type not allowed')
    try {
        const newUserData = new SyncUser({
            name,
            email : email.toLowerCase(),
            password : hashpassword,
            role,
            userType,
        })
        await newUserData.save()
        return newUserData
    } catch (error) {
        console.log(error)
       throw new BadRequestError(error.message || 'Error occured while creating your account')
    }
}

const attachNewNotification = async({title, message, linkto, userId})=>{
    try {
        const userInfo = await getUserInfo({_id : userId})
        const newNotifs = new notification({
            title,
            message,
            userRole : userInfo.role,
            user : userInfo.Id,
            linkto,
            read : false
        })
        await newNotifs.save()
        const doc = await findUserAndUpdate({_id : userId}, {$push : {notifications : newNotifs._id}})
        return
    } catch (error) {
        console.log(error)
        throw new BadRequestError('Error Sending Notification')
    }
}

const checkTrackStatus = async (trackIds) => {
    try {
        for (const trackId of trackIds) {
            const trackDetail = await Track.findOne({ _id: trackId }).select('_id').exec();
            if (trackDetail.uploadStatus !== 'Approved') {
              return trackDetail._id;
            }
        }
        return null; // no owned tracks found
    } catch (error) {
        throw new BadRequestError(error.message || "Error occurred while processing your request");
    }

};

const checkForExistingOwnershipByUser = async (trackIds, newOwnerId) => {
    try {
        let infos = []
        for (const trackId of trackIds) {
            const ownedTrack = await Track.findOne({_id: trackId}).select('_id user userModel').exec();
            if (ownedTrack.user.equals(newOwnerId)) {
              return {existing : true};
            }else{
                infos.push(ownedTrack)
            }
        }
        return {existing : false, infos};
    } catch (error) {
        throw new BadRequestError(error.message || "Error occurred while processing your request");
    }

};


module.exports = {findUserAndUpdate, getUserInfo,createNewMusicUploader, createNewSyncUser, attachNewNotification,checkForExistingOwnershipByUser,checkTrackStatus}