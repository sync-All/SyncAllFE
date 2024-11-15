const uploader = require('../models/usermodel').uploader
const syncUser = require('../models/usermodel').syncUser
const tracks = require('../models/track.model').track
const trackLicense = require('../models/track.model').trackLicense

const {crbtRequest,interpolationRequest,fmtRequest,samplingRequest,smcRequest,tvaRequest,videoGamesRequest} = require('../models/quote.model')

const totalUsersKpi = async(queryFilter)=>{
    const currentDate = new Date();
    let currentTotalUsers = 0
    let previousTotalUsers = 0
    let totalUsers = 0
    let totalUserkpi = 0
    const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - (queryFilter - 1) , 1);

    const [countCurrent1, countCurrent2] = await Promise.all([
            uploader.countDocuments()
        .where('createdAt').lte(currentMonth).exec(),  syncUser.countDocuments()
        .where('createdAt').lte(currentMonth).exec()
    ])

    const [countPrevious1, countPrevious2] = await Promise.all([
        uploader.countDocuments()
        .where('createdAt').lte(previousMonth).exec(), syncUser.countDocuments()
        .where('createdAt').lte(previousMonth).exec()
    ])

    currentTotalUsers = countCurrent1 + countCurrent2

    previousTotalUsers = countPrevious1 + countPrevious2

    if (previousTotalUsers > 0 ){
        totalUserkpi = Math.floor((currentTotalUsers - previousTotalUsers)/ previousTotalUsers * 100)
    }else{
        totalUserkpi = 100
    }

    let newUsers = currentTotalUsers - previousTotalUsers

    totalUsers = currentTotalUsers
    let newusersKpi = totalUserkpi
    return{
        totalUsers,
        newUsers,
        newusersKpi,
        totalUserkpi
    }
}


const activeUsersKpi = async(queryFilter)=>{
    const currentDate = new Date();
    let totalActiveUsers = 0
    let currentActiveUsers = 0
    let previousActiveUsers = 0
    let activeUserKpi = 0
    const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - (queryFilter - 1), 1);

    const [countCurrent1, countCurrent2] = await Promise.all([
        uploader.countDocuments()
        .where('createdAt').lte(currentMonth)
        .where('accountStatus').equals('Active'),  syncUser.countDocuments()
        .where('createdAt').lte(currentMonth).where('accountStatus').equals('Active')
    ])

    const [countPrevious1, countPrevious2] = await Promise.all([
        uploader.countDocuments()
        .where('createdAt').lte(previousMonth).where('accountStatus').equals('Active'), syncUser.countDocuments()
        .where('createdAt').lte(previousMonth).where('accountStatus').equals('Active')
    ])

    currentActiveUsers = countCurrent1 + countCurrent2

    previousActiveUsers = countPrevious1 + countPrevious2

    if (previousActiveUsers > 0 ){
        activeUserKpi = Math.floor((currentActiveUsers - previousActiveUsers )/ currentActiveUsers * 100)
    }else{
        activeUserKpi = 100
    }

    totalActiveUsers = currentActiveUsers

    if(queryFilter > 1){
        totalActiveUsers = previousActiveUsers
    }

    return{
        totalActiveUsers,
        activeUserKpi
    }
}

const inActiveUsersKpi = async(queryFilter)=>{
    const currentDate = new Date();
    let totalInActiveUsers = 0
    let currentInActiveUsers = 0
    let previousInActiveUsers = 0
    let inActiveUserKpi = 0
    const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - (queryFilter - 1) , 1);

    const [countCurrent1, countCurrent2] = await Promise.all([
        uploader.countDocuments()
        .where('createdAt').lte(currentMonth)
        .where('accountStatus').equals('Inactive'),  syncUser.countDocuments()
        .where('createdAt').lte(currentMonth).where('accountStatus').equals('Inactive')
    ])

    const [countPrevious1, countPrevious2] = await Promise.all([
        uploader.countDocuments()
        .where('createdAt').lte(previousMonth).where('accountStatus').equals('Inactive'), syncUser.countDocuments()
        .where('createdAt').lte(previousMonth).where('accountStatus').equals('Inactive')
    ])

    currentInActiveUsers = countCurrent1 + countCurrent2
    previousInActiveUsers = countPrevious1 + countPrevious2

    totalInActiveUsers = currentInActiveUsers
    if(queryFilter > 1){
        totalInActiveUsers = previousInActiveUsers
    }

    if(previousInActiveUsers > 0){
        inActiveUserKpi = Math.floor((currentInActiveUsers - previousInActiveUsers )/ previousInActiveUsers * 100)
    }else{
        inActiveUserKpi = 0
    }
    

    return{
        totalInActiveUsers,
        inActiveUserKpi
    }
}

const totalTracks = async(queryFilter)=>{
    const currentDate = new Date();
    let totalTracks = 0
    let totalTracksKpi = 0

    const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - (queryFilter - 1) , 1);

    const countCurrent = await tracks.countDocuments().where('createdAt').lte(currentMonth)

    const countPrevious = await tracks.countDocuments().where('createdAt').lte(previousMonth)

    totalTracks =  countCurrent

    if(queryFilter > 1){
        totalTracks = countPrevious
    }

    if(countPrevious > 0){
        totalTracksKpi = Math.floor((countCurrent - countPrevious )/ countPrevious * 100)
    }else{
        totalTracksKpi = 100
    }
    
    return{
        totalTracks,
        totalTracksKpi
    }

}

const totalLicensedTracks = async(queryFilter)=>{
    const currentDate = new Date();
    let totalLicensedTracks = 0
    let totalLicensedTracksKpi = 0
    
    const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - (queryFilter - 1) , 1);

    const countCurrent = await trackLicense.countDocuments().where('createdAt').lte(currentMonth)

    const countPrevious = await trackLicense.countDocuments().where('createdAt').lte(previousMonth)

    totalLicensedTracks =  countCurrent
    if(queryFilter > 1) {
        totalLicensedTracks =  countPrevious
    }
    if(countPrevious > 0){
        totalLicensedTracksKpi = Math.floor((countCurrent - countPrevious )/ countPrevious * 100)
    }else{
        totalLicensedTracksKpi = 0
    }
    

    
    totalLicensedTracksKpi = isNaN(totalLicensedTracksKpi) ? 0 : totalLicensedTracksKpi

    return{
        totalLicensedTracks,
        totalLicensedTracksKpi
    }
}

const quotesSubmitted = async(queryFilter)=>{
    const currentDate = new Date();
    let totalQuotes = 0
    let totalCurrentQuotes = 0
    let previousTotalQuotes = 0
    let quotesSubmittedKpi = 0
    const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth()- (queryFilter - 1) , 1);

    const [countCurrent1, countCurrent2, countCurrent3, countCurrent4,countCurrent5, countCurrent6, countCurrent7] = await Promise.all([
        crbtRequest.countDocuments()
        .where('createdAt').lte(currentMonth),  
        interpolationRequest.countDocuments()
        .where('createdAt').lte(currentMonth),
        fmtRequest.countDocuments()
        .where('createdAt').lte(currentMonth),  
        samplingRequest.countDocuments()
        .where('createdAt').lte(currentMonth),
        smcRequest.countDocuments()
        .where('createdAt').lte(currentMonth),  
        tvaRequest.countDocuments()
        .where('createdAt').lte(currentMonth),
        videoGamesRequest.countDocuments()
        .where('createdAt').lte(currentMonth),  
        
    ])

    const [countPrevious1, countPrevious2, countPrevious3, countPrevious4,countPrevious5, countPrevious6, countPrevious7] = await Promise.all([
        crbtRequest.countDocuments()
        .where('createdAt').lte(previousMonth),  
        interpolationRequest.countDocuments()
        .where('createdAt').lte(previousMonth),
        fmtRequest.countDocuments()
        .where('createdAt').lte(previousMonth),  
        samplingRequest.countDocuments()
        .where('createdAt').lte(previousMonth),
        smcRequest.countDocuments()
        .where('createdAt').lte(previousMonth),  
        tvaRequest.countDocuments()
        .where('createdAt').lte(previousMonth),
        videoGamesRequest.countDocuments()
        .where('createdAt').lte(previousMonth),  
        
    ])

    totalCurrentQuotes = countCurrent1 + countCurrent2 + countCurrent3 + countCurrent4 + countCurrent5 + countCurrent6 + countCurrent7

    previousTotalQuotes = countPrevious1 + countPrevious2 + countPrevious3 + countPrevious4 + countPrevious5 + countPrevious6 + countPrevious7

    totalQuotes = totalCurrentQuotes
    if(queryFilter > 1){
        totalQuotes = previousTotalQuotes
    }

    if(previousTotalQuotes > 0){
        quotesSubmittedKpi = Math.floor((totalCurrentQuotes - previousTotalQuotes )/ previousTotalQuotes * 100)
    }else{
        quotesSubmittedKpi = 0
    }

    return{
        totalQuotes,
        quotesSubmittedKpi
    }
}


const metricEvaluator = async(queryFilter)=>{

    try {
        const metric = {
            ...await totalUsersKpi(queryFilter),
            ...await activeUsersKpi(queryFilter),
            ...await inActiveUsersKpi(queryFilter),
            ...await totalTracks(queryFilter),
            ...await totalLicensedTracks(queryFilter),
            ...await quotesSubmitted(queryFilter),
    
        }
        return metric
    } catch (error) {
        console.log(error)
    }
}


module.exports = metricEvaluator