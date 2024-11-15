const uploader = require('../models/usermodel').uploader
const syncUser = require('../models/usermodel').syncUser
const tracks = require('../models/track.model').track
const trackLicense = require('../models/track.model').trackLicense

const {crbtRequest,interpolationRequest,fmtRequest,samplingRequest,smcRequest,tvaRequest,videoGamesRequest} = require('../models/quote.model')

const totalUsersKpi = async(queryFilter)=>{
    const currentDate = new Date();
    let totalCurrentUsers = 0
    let previousTotalUsers = 0
    let totalUserskpi = 0
    if(queryFilter == "this_month"){
        const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() , 1);

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

        totalCurrentUsers = countCurrent1 + countCurrent2

        previousTotalUsers = countPrevious1 + countPrevious2

        totalUserskpi = Math.floor(Math.abs(previousTotalUsers - totalCurrentUsers)/ totalCurrentUsers * 100)

    }else if(queryFilter == "2_month"){
        const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1 , 1);

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

       totalCurrentUsers = countCurrent1 + countCurrent2

       previousTotalUsers = countPrevious1 + countPrevious2

       totalUserskpi = Math.floor(Math.abs(previousTotalUsers - totalCurrentUsers)/ totalCurrentUsers * 100)
    }
    totalUserskpi = isNaN(totalUserskpi) ? 0 : totalUserskpi
    return{
        totalCurrentUsers,
        totalUserskpi
    }
}

const newUsersKpi = async(queryFilter)=>{
    const currentDate = new Date();
    let totalNewUsers = 0
    let previousNewUsers = 0
    let newUsersKpi = 0
    if(queryFilter == "this_month"){
        const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() , 1);
        const otherPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth()-1 , 1);

        const [countCurrent1, countCurrent2] = await Promise.all([
             uploader.countDocuments()
            .where('createdAt').lte(currentMonth).gte(previousMonth).exec(),  syncUser.countDocuments()
            .where('createdAt').lte(currentMonth).gte(previousMonth).exec()
        ])

        const [countPrevious1, countPrevious2] = await Promise.all([
            uploader.countDocuments()
            .where('createdAt').lte(previousMonth).gte(otherPreviousMonth).exec(), syncUser.countDocuments()
            .where('createdAt').lte(previousMonth).gte(otherPreviousMonth).exec()
        ])

        totalNewUsers = countCurrent1 + countCurrent2

        previousNewUsers = countPrevious1 + countPrevious2

        newUsersKpi = Math.floor((totalNewUsers - previousNewUsers )/ previousNewUsers * 100)

    }else if(queryFilter == "2_month"){
        const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1 , 1);
        const otherPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth()-2 , 1);

        const [countCurrent1, countCurrent2] = await Promise.all([
            uploader.countDocuments()
           .where('createdAt').lte(currentMonth).gte(previousMonth).exec(),  syncUser.countDocuments()
           .where('createdAt').lte(currentMonth).gte(previousMonth).exec()
       ])

       const [countPrevious1, countPrevious2] = await Promise.all([
           uploader.countDocuments()
           .where('createdAt').lte(previousMonth).gte(otherPreviousMonth).exec(), syncUser.countDocuments()
           .where('createdAt').lte(previousMonth).gte(otherPreviousMonth).exec()
       ])


       totalNewUsers = countCurrent1 + countCurrent2

       previousTotalUsers = countPrevious1 + countPrevious2

       newUsersKpi = Math.floor((totalNewUsers - previousNewUsers )/ previousNewUsers * 100)
    }
    newUsersKpi = isNaN(newUsersKpi) ? 0 : newUsersKpi
    return{
        totalNewUsers,
        newUsersKpi
    }
}

const activeUsersKpi = async(queryFilter)=>{
    const currentDate = new Date();
    let totalActiveUsers = 0
    let previousActiveUsers = 0
    let activeUsersKpi = 0
    if(queryFilter == "this_month"){
        const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() , 1);

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

        totalActiveUsers = countCurrent1 + countCurrent2

        previousActiveUsers = countPrevious1 + countPrevious2

        activeUsersKpi = Math.floor((totalActiveUsers - previousActiveUsers )/ previousActiveUsers * 100)

    }else if(queryFilter == "2_month"){
        const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1 , 1);

        const [countCurrent1, countCurrent2] = await Promise.all([
            uploader.countDocuments()
           .where('createdAt').lte(currentMonth).where('accountStatus').equals('Active'),  syncUser.countDocuments()
           .where('createdAt').lte(currentMonth).where('accountStatus').equals('Active')
       ])

       const [countPrevious1, countPrevious2] = await Promise.all([
           uploader.countDocuments()
           .where('createdAt').lte(previousMonth).where('accountStatus').equals('Active'), syncUser.countDocuments()
           .where('createdAt').lte(previousMonth).where('accountStatus').equals('Active')
       ])


       totalActiveUsers = countCurrent1 + countCurrent2

       previousActiveUsers = countPrevious1 + countPrevious2

       activeUsersKpi = Math.floor((totalActiveUsers - previousActiveUsers )/ previousActiveUsers * 100)
    }

    activeUsersKpi = isNaN(activeUsersKpi) ? 0 : activeUsersKpi
    return{
        totalActiveUsers,
        activeUsersKpi
    }
}

const inActiveUsersKpi = async(queryFilter)=>{
    const currentDate = new Date();
    let totalInActiveUsers = 0
    let previousInActiveUsers = 0
    let inActiveUsersKpi = 0
    if(queryFilter == "this_month"){
        const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() , 1);

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

        totalInActiveUsers = countCurrent1 + countCurrent2

        previousInActiveUsers = countPrevious1 + countPrevious2

        inActiveUsersKpi = Math.floor((totalInActiveUsers - previousInActiveUsers )/ previousInActiveUsers * 100)

    }else if(queryFilter == "2_month"){
        const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1 , 1);

        const [countCurrent1, countCurrent2] = await Promise.all([
            uploader.countDocuments()
           .where('createdAt').lte(currentMonth).where('accountStatus').equals('Active'),  syncUser.countDocuments()
           .where('createdAt').lte(currentMonth).where('accountStatus').equals('Active')
       ])

        const [countPrevious1, countPrevious2] = await Promise.all([
           uploader.countDocuments()
           .where('createdAt').lte(previousMonth).where('accountStatus').equals('Active'), syncUser.countDocuments()
           .where('createdAt').lte(previousMonth).where('accountStatus').equals('Active')
       ])


       totalInActiveUsers = countCurrent1 + countCurrent2

       previousInActiveUsers = countPrevious1 + countPrevious2

       inActiveUsersKpi = Math.floor((totalInActiveUsers - previousInActiveUsers )/ previousInActiveUsers * 100)
    }

    inActiveUsersKpi = isNaN(inActiveUsersKpi) ? 0 : inActiveUsersKpi

    return{
        totalInActiveUsers,
        inActiveUsersKpi
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

    totalTracksKpi = Math.floor((countCurrent - countPrevious )/ countPrevious * 100)
    totalTracksKpi = isNaN(totalTracksKpi) ? 0 : totalTracksKpi

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
    totalLicensedTracksKpi = Math.floor((countCurrent - countPrevious )/ countPrevious * 100)


    
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


    quotesSubmittedKpi = Math.floor((totalCurrentQuotes - previousTotalQuotes )/ previousTotalQuotes * 100)
    quotesSubmittedKpi = isNaN(quotesSubmittedKpi) ? 0 : quotesSubmittedKpi

    return{
        totalCurrentQuotes,
        quotesSubmittedKpi
    }
}


const metricEvaluator = async(queryFilter)=>{

    const metric = {
        ...await totalUsersKpi(queryFilter),
        ...await newUsersKpi(queryFilter),
        ...await activeUsersKpi(queryFilter),
        ...await inActiveUsersKpi(queryFilter),
        ...await totalTracks(queryFilter),
        ...await totalLicensedTracks(queryFilter),
        ...await quotesSubmitted(queryFilter),

    }
    return metric
}


module.exports = metricEvaluator