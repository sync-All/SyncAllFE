const axios = require('axios')
require('dotenv').config()


const air_pk = process.env.AIR_PK
async function createFmtRecord(formfields, extrainfo, syncEmail){
  console.log(formfields)
  formfields = formfields.toObject()
  delete formfields.role_type
  delete formfields.track_info
  delete formfields.user_info
  delete formfields.updatedAt
  delete formfields.__v
  delete formfields._id
  const records = {
    fields: {
      ...formfields,
      genre : formfields.genre.join(),
      project_cast : formfields.project_cast.join(),
      distribution : formfields.distribution.join(),
      usage : formfields.usage.join(),
      territories : formfields.territories.join(),
      media : formfields.media.join(),
      track_name : extrainfo.trackTitle,
      spotify_link : extrainfo.spotifyLink,
      'Uploader Email' : extrainfo.user.email,
      'Sync_User Email' : syncEmail,
      createdAt : formfields.createdAt,
      attachments : formfields.attachments.join(),
      status : 'pending'
    }
  }
  console.log(records)

  try {
    const res = await axios.post('https://api.airtable.com/v0/appaKCViIID5q3ZBE/Film_Movies_Tv_series', records, {
      headers : {
        Authorization : `Bearer ${air_pk}`,
        'Content-Type' : 'application/json'
      }
    })
    console.log(res.data)
    return;
  } catch (error) {
    console.log(error)
  }
}


async function createTVARecord(formfields, extrainfo, syncEmail){

  formfields = formfields.toObject()
  delete formfields.role_type
  delete formfields.track_info
  delete formfields.user_info
  delete formfields.updatedAt
  delete formfields.__v
  delete formfields._id
  const records = {
    fields: {
      ...formfields,
      networks : formfields.networks.join(),
      intended_usage : formfields.intended_usage.join(),
      territories : formfields.territories.join(),
      attachments : formfields.attachments.join(),
      track_name : extrainfo.trackTitle,
      spotify_link : extrainfo.spotifyLink,
      'Uploader Email' : extrainfo.user.email,
      'Sync_User Email' : syncEmail,
      createdAt : formfields.createdAt,
      attachments : formfields.attachments.join(),
      status : 'pending'
    }
  }
  console.log(records)

  try {
    const response = await axios.post('https://api.airtable.com/v0/appaKCViIID5q3ZBE/Tv_ads_commercial_request', records, {
      headers : {
        Authorization : `Bearer ${air_pk}`,
        'Content-Type' : 'application/json'
      }
    })
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}



async function createVideoGamesRecord(formfields, extrainfo, syncEmail){
  formfields = formfields.toObject()
  delete formfields.role_type
  delete formfields.track_info
  delete formfields.user_info
  delete formfields.updatedAt
  delete formfields.__v
  delete formfields._id
  const record = {
    fields: {
      ...formfields,
      genre : formfields.genre.join(),
      territories : formfields.territories.join(),
      usage : formfields.usage.join(),
      attachments : formfields.attachments.join(),
      track_name : extrainfo.trackTitle,
      spotify_link : extrainfo.spotifyLink,
      'Uploader Email' : extrainfo.user.email,
      'Sync_User Email' : syncEmail,
      createdAt : formfields.createdAt,
      attachments : formfields.attachments.join(),
      status : 'pending'
    }
  }
  console.log(record)

  try {
    const response = await axios.post('https://api.airtable.com/v0/appaKCViIID5q3ZBE/Video_Games_request', record, {
      headers : {
        Authorization : `Bearer ${air_pk}`,
        'Content-Type' : 'application/json'
      }
    })
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}


async function createSampleRecord(formfields, extrainfo, syncEmail){
  formfields = formfields.toObject()
  delete formfields.role_type
  delete formfields.track_info
  delete formfields.user_info
  delete formfields.updatedAt
  delete formfields.__v
  delete formfields._id
  const record = {
    fields: {
      ...formfields,
      genre : formfields.genre.join(),
      artists_or_group : formfields.artists_or_group.join(),
      distribution_channels : formfields.distribution_channels.join(),
      intended_usage : formfields.intended_usage.join(),
      territories : formfields.territories.join(),
      media_formats : formfields.media_formats.join(),
      attachments : formfields.attachments.join(),
      track_name : extrainfo.trackTitle,
      spotify_link : extrainfo.spotifyLink,
      'Uploader Email' : extrainfo.user.email,
      'Sync_User Email' : syncEmail,
      createdAt : formfields.createdAt,
      attachments : formfields.attachments.join(),
      status : 'pending'
    }
  }
  console.log(record)

  try {
    const response = await axios.post('https://api.airtable.com/v0/appaKCViIID5q3ZBE/Sampling_request', record, {
      headers : {
        Authorization : `Bearer ${air_pk}`,
        'Content-Type' : 'application/json'
      }
    })
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}


async function createInterpolationRecord(formfields, extrainfo, syncEmail){
  formfields = formfields.toObject()
  delete formfields.role_type
  delete formfields.track_info
  delete formfields.user_info
  delete formfields.updatedAt
  delete formfields.__v
  delete formfields._id
  const record = {
    fields: {
      ...formfields,
      genre : formfields.genre.join(),
      artists_or_group : formfields.artists_or_group.join(),
      distribution_channels : formfields.distribution_channels.join(),
      intended_usage : formfields.intended_usage.join(),
      territories : formfields.territories.join(),
      media_formats : formfields.media_formats.join(),
      attachments : formfields.attachments.join(),
      track_name : extrainfo.trackTitle,
      spotify_link : extrainfo.spotifyLink,
      'Uploader Email' : extrainfo.user.email,
      'Sync_User Email' : syncEmail,
      createdAt : formfields.createdAt,
      attachments : formfields.attachments.join(),
      status : 'pending'
    }
  }
  console.log(record)

  try {
    const response = await axios.post('https://api.airtable.com/v0/appaKCViIID5q3ZBE/Interpolation_request', record, {
      headers : {
        Authorization : `Bearer ${air_pk}`,
        'Content-Type' : 'application/json'
      }
    })
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}


async function createCRBTRecord(formfields, extrainfo, syncEmail){
  formfields = formfields.toObject()
  delete formfields.role_type
  delete formfields.track_info
  delete formfields.user_info
  delete formfields.updatedAt
  delete formfields.__v
  delete formfields._id
  const record = {
    fields: {
      ...formfields,
      distribution : formfields.distribution.join(),
      territories : formfields.territories.join(),
      track_name : extrainfo.trackTitle,
      spotify_link : extrainfo.spotifyLink,
      'Uploader Email' : extrainfo.user.email,
      'Sync_User Email' : syncEmail,
      createdAt : formfields.createdAt,
      status : 'pending'
    }
  }

  try {
    const response = await axios.post('https://api.airtable.com/v0/appaKCViIID5q3ZBE/CRBT_request', record, {
      headers : {
        Authorization : `Bearer ${air_pk}`,
        'Content-Type' : 'application/json'
      }
    })
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}


async function createSMCRecord(formfields, extrainfo, syncEmail){
  formfields = formfields.toObject()
  delete formfields.role_type
  delete formfields.track_info
  delete formfields.user_info
  delete formfields.updatedAt
  delete formfields.__v
  delete formfields._id
  const record = {
    fields: {
      ...formfields,
      platform : formfields.platform.join(),
      content_type : formfields.content_type.join(),
      distribution : formfields.distribution.join(),
      territories : formfields.territories.join(),
      attachments : formfields.attachments.join(),
      track_name : extrainfo.trackTitle,
      spotify_link : extrainfo.spotifyLink,
      'Uploader Email' : extrainfo.user.email,
      'Sync_User Email' : syncEmail,
      createdAt : formfields.createdAt,
      attachments : formfields.attachments.join(),
      status : 'pending'
    }
  }

  try {
    const response = await axios.post('https://api.airtable.com/v0/appaKCViIID5q3ZBE/Social_Media_Content_request', record, {
      headers : {
        Authorization : `Bearer ${air_pk}`,
        'Content-Type' : 'application/json'
      }
    })
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}



module.exports = {createFmtRecord, createTVARecord, createVideoGamesRecord,createSampleRecord, createInterpolationRecord, createCRBTRecord, createSMCRecord}