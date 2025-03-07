const { notification } = require('../models/usermodel');
const { BadRequestError } = require('../utils/CustomError');

const User = require('../models/usermodel').uploader;
const SyncUser = require('../models/usermodel').syncUser;


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
        const userInfo = await Promise.any([ User.findOne(searchParams).populate(options.populate && options.populate).select(options.select && options.select).then(user => user || Promise.reject()), SyncUser.findOne(searchParams).select(options.select && options.select).populate(options.populate && options.populate).then(user => user || Promise.reject())])
        return userInfo
    }catch(error){
        console.log(error)
        if (error instanceof AggregateError) {
            // Handle all promises failing
            throw new BadRequestError("User not found in any collection");
        } else {
            throw new BadRequestError(error.message || "Error occurred while fetching user info");
        }
    }
}

const createNewMusicUploader = async({name,email,password,role,userType})=>{
    try {
        const newUserData = new User({
            name,
            email : email.toLowerCase(),
            password,
            role,
            userType,
        })
        await newUserData.save()
        return newUserData
    } catch (error) {
        throw new BadRequestError(error.message || 'Error occured while creating music uploader user')
    }
}

const createNewSyncUser = async({name,email,password,role,userType})=>{
    try {
        const newUserData = new SyncUser({
            name,
            email : email.toLowerCase(),
            password,
            role,
            userType,
        })
        await newUserData.save()
        return newUserData
    } catch (error) {
        throw new BadRequestError(error.message || 'Error occured while creating sync user')
    }
}

const attachNewNotification = async({title, message, userId})=>{
    try {
        const userInfo = await getUserInfo({_id : userId})
        const newNotifs = new notification({
            title,
            message,
            userRole : userInfo.role,
            user : userInfo.Id,
            read : false
        })
        await newNotifs.save()
        const doc = await findUserAndUpdate({_id : userId}, {$push : {notifications : newNotifs._id}})
        console.log({newNotifs, doc})
        return
    } catch (error) {
        console.log(error)
        throw new BadRequestError('Error Sending Notification')
    }
}

module.exports = {findUserAndUpdate, getUserInfo,createNewMusicUploader, createNewSyncUser, attachNewNotification}