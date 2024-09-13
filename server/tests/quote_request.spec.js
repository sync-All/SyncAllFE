const request = require('supertest')
const fs = require('fs')
const path = require('path')
const app =  require('../app')

const signInInfo = {
    email : "momoh.oladimeji@gmail.com",
    password : "123456789"
}

describe('Sync User quote request',()=>{
    let accesstoken = ''
    beforeAll(async()=>{
        process.env.NODE_ENV = '';

        await request(app)
        .post("/api/v1/signin")
        .send(signInInfo)
        .then((res)=>{
            accesstoken = res.body.token
        }) 
    })
    const attachment_path = path.join(__dirname, "..","/public/images/fb.png")
    // describe('video_game quote request', ()=>{
    //     // it('Should fail if track id is empty', async()=>{
    //     //     const request_data = {
    //     //         game_title : "Farm Fresh",
    //     //         genre : ['pop', 'wild'],
    //     //         platform : "Mobile",
    //     //         release_date : "June 24 1997",
    //     //         target_audience : "Young adults",
    //     //         length : "10 seconds",
    //     //         development_stage : "Still in its prime",
    //     //         territories : ["America", "North Africa"],
    //     //         usage : "N/A",
    //     //         media_format : "Jpeg",
    //     //         license_duration : "Yearly",
    //     //         additional_info : "Nothing for now",
    //     //         role_type : "Video Games",
    //     //         track_info : "",
    
    //     //     }
    //     //     await request(app)
    //     //     .post('/api/v1/quote-request/video_game')
    //     //     .set("Authorization", `${accesstoken}`)
    //     //     .send(request_data)
    //     //     .expect(400)
    //     // })
    //     it('Should pass if track id is valid', async()=>{
    //         const request_data = {
    //             game_title : "Farm Fresh",
    //             genre : ['pop', 'wild'],
    //             platform : "Mobile",
    //             release_date : "June 24 1997",
    //             target_audience : "Young adults",
    //             length : "10 seconds",
    //             development_stage : "Still in its prime",
    //             territories : ["America", "North Africa"],
    //             usage : ["N/A"],
    //             media_format : "Jpeg",
    //             license_duration : "Yearly",
    //             additional_info : "Nothing for now",
    //             role_type : "Video Games",
    //             track_info : "66df121f5fa9310230668297",
    
    //         }
    //         await request(app)
    //         .post('/api/v1/quote-request/video_game')
    //         .set("Authorization", `${accesstoken}`)
    //         .attach('attachments',  attachment_path)
    //         .field(request_data)
    //         .expect(200)
    //         .catch((res)=>{
    //             console.log(res)
    //         })
    //     })
    // })

    // describe("Sampling quote request", ()=>{
    //     // it('Should fail if track id is empty', async()=>{
    //     //     const request_data = {
    //     //         project_title : "Farm Fresh",
    //     //         genre : ['pop', 'wild'],
    //     //         artist_or_group : ["Pheels", "Young John"],
    //     //         release_date : "June 24 1997",
    //     //         distribution_channels: ['vaddo', 'mtn', 'gangus'],
    //     //         original_song : "Original - Remix",
    //     //         artist_name : "Dee Tunes",
    //     //         portion_to_be_sampled : "10:30 - 12:30",
    //     //         intended_usage : ["N/A"],
    //     //         territories: ["Lavida", "Innoca"],
    //     //         license_duration : "Yearly",
    //     //         media_format : ["mp3", 'mp4'],
    //     //         samples_of_other_songs : "Vishini",
    //     //         additional_info : "N/A",
    //     //         role_type :  "Sampling",
    //     //         track_info : "",
    
    //     //     }
    //     //     await request(app)
    //     //     .post('/api/v1/quote-request/sampling')
    //     //     .set("Authorization", `${accesstoken}`)
    //     //     .attach('attachments',  attachment_path)
    //     //     .field(request_data)
    //     //     .expect(400)
    //     // })
    //     it('Should pass if track id is valid', async()=>{
    //         const request_data = {
    //             project_title : "Farm Fresh",
    //             genre : ['pop', 'wild'],
    //             artists_or_group : ["Pheels", "Young John"],
    //             release_date : "June 24 1997",
    //             distribution_channels: ['vaddo', 'mtn', 'gangus'],
    //             original_song : "Original - Remix",
    //             artist_name : "Dee Tunes",
    //             portion_to_be_sampled : "10:30 - 12:30",
    //             intended_usage : ["N/A"],
    //             territories: ["Lavida", "Innoca"],
    //             license_duration : "Yearly",
    //             media_formats : ["mp3", 'mp4'],
    //             samples_of_other_songs : "Vishini",
    //             additional_info : "N/A",
    //             role_type :  "Sampling",
    //             track_info : "66df121f5fa9310230668297",
    
    //         }
    //          await request(app)
    //         .post('/api/v1/quote-request/sampling')
    //         .set("Authorization", `${accesstoken}`)
    //         .attach('attachments',  attachment_path)
    //         .field(request_data)
    //         .expect(200)
    //     })
    // })
    // describe("TVA quote request", ()=>{
    //     it('Should pass if track id is valid', async()=>{
    //         const request_data = {
    //             product : "Farm Fresh",
    //             theme : 'ladi',
    //             length : "10 seconds",
    //             production_budget : "10 pounds",
    //             air_date: 'lade',
    //             networks : ["Original - Remix"],
    //             duration_of_music_usage : "Dee Tunes",
    //             intended_usage :['not sure'],
    //             territories: ["Lavida", "Innoca"],
    //             license_duration : "Yearly",
    //             media : "format",
    //             additional_info : "N/A",
    //             role_type :  "TV Commercial/Ads",
    //             track_info : "66df121f5fa9310230668297",
    
    //         }
    //          await request(app)
    //         .post('/api/v1/quote-request/tva')
    //         .set("Authorization", `${accesstoken}`)
    //         .attach('attachments',  attachment_path)
    //         .field(request_data)
    //         .expect(200)
    //     })
    // })

    // describe('fmt quote request',()=>{
    //     it('Should pass if all details are correct', async()=>{
    //         const request_data = {
    //             project_title : "Farm Fresh",
    //             genre : ['pop', 'wild'],
    //             project_director : "Oladee",
    //             project_producer : "Devdee",
    //             project_cast : ["Only Me"],
    //             production_budget : "10 dollars",
    //             production_synopsis : "Still in its prime, but we are still cooking",
    //             scene_synopsis : 'Yet to be determined but we will let you know with time',
    //             distributor : "Africa Magic",
    //             distribution : ["Online", "Offline", "General Market"],
    //             usage : ["Movies"],
    //             length : "Depends on charges",
    //             territories : ["NGN", "Canada", "Aus"],
    //             media : ["mp4"],
    //             license_duration : 'Yearly',
    //             additional_info : 'N/A',
    //             track_info : '66df121f5fa9310230668297'
    //         }
    //         await request(app)
    //         .post('/api/v1/quote-request/fmt')
    //         .set("Authorization", `${accesstoken}`)
    //         .attach('attachments',  attachment_path)
    //         .field(request_data)
    //         .expect(200)
    //         .catch((res)=>{
    //             console.log(res)
    //         })
    //     })
    // })
    // describe("Interpolation quote request", ()=>{
    //     it('Should pass if track id is valid', async()=>{
    //         const request_data = {
    //             project_title : "Farm Fresh",
    //             genre : ['pop', 'wild'],
    //             artists_or_group : ["Pheels", "Young John"],
    //             release_date : "June 24 1997",
    //             distribution_channels: ['vaddo', 'mtn', 'gangus'],
    //             original_song : "Original - Remix",
    //             artist_name : "Dee Tunes",
    //             portion_to_be_sampled : "10:30 - 12:30",
    //             intended_usage : ["N/A"],
    //             territories: ["Lavida", "Innoca"],
    //             license_duration : "Yearly",
    //             media_formats : ["mp3", 'mp4'],
    //             samples_of_other_songs : "Vishini",
    //             additional_info : "N/A",
    //             track_info : "66df121f5fa9310230668297",
    
    //         }
    //          await request(app)
    //         .post('/api/v1/quote-request/interpolation')
    //         .set("Authorization", `${accesstoken}`)
    //         .attach('attachments',  attachment_path)
    //         .field(request_data)
    //         .expect(200)
    //     })
    // })
    describe("CRBT quote request", ()=>{
        it('Should pass if track id is valid', async()=>{
            const request_data = {
                carrier : "Farm Fresh",
                target_audience : "Young and Old",
                theme: "Soft and cool",
                duration : "10 seconds",
                distribution : ["N/A"],
                territories: ["Lavida", "Innoca"],
                license_duration : "Yearly",
                media : "Mp4 Mp3",
                samples_of_other_songs : "Vishini",
                additional_info : "N/A",
                track_info : "66df121f5fa9310230668297",
    
            }
             await request(app)
            .post('/api/v1/quote-request/crbt')
            .set("Authorization", `${accesstoken}`)
            .send(request_data)
            .expect(200)
        })
    })
})