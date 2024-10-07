const uploader = require('../models/usermodel').uploader
const syncUser = require('../models/usermodel').syncUser

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

    inActiveUsersKpi = isNaN(inActiveUsersKpi) && 0

    return{
        totalInActiveUsers,
        inActiveUsersKpi
    }
}


const metricEvaluator = async(queryFilter)=>{

    const metric = {
        ...await totalUsersKpi(queryFilter),
        ...await newUsersKpi(queryFilter),
        ...await activeUsersKpi(queryFilter),
        ...await inActiveUsersKpi(queryFilter)
    }
    return metric
}


module.exports = metricEvaluator