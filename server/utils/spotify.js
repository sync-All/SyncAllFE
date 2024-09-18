const axios = require('axios')
require('dotenv').config()
const spotifyError = require('./CustomError').spotifyError

const clientId = process.env.SPOTIFY_CLIENT_ID
const clientS = process.env.SPOTIFY_CLIENT_S


const SpotifyPreview = async(res, trackLink)=>{
    const trackId = trackLink.split('k/')[1]?.split('?')[0]
    // const clientId = process.env.SPOTIFY_CLIENT_ID
    // const clientS = process.env.SPOTIFY_CLIENT_S
    const BasicToken = new Buffer.from(clientId + ':' + clientS).toString('base64')

    try {
        const result = await axios.post('https://accounts.spotify.com/api/token', {
            grant_type : 'client_credentials'
        },{
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' + BasicToken
            }
        })

        const token = result.data.access_token

        const trackDetails = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
    
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })

        if(!trackDetails.data.preview_url){
            return res.status(422).send('No preview available for this track, Please try again later')
        }
        const minutes = Math.floor(trackDetails.data.duration_ms / 60000);
        const seconds = Math.floor((trackDetails.data.duration_ms % 60000) / 1000);
        const trackDuration = `${String(minutes)} minutes ${String(seconds)} seconds`;
        return {
            preview_url : trackDetails.data.preview_url,
            isrc : trackDetails.data.external_ids.isrc,
            spotifyLink : trackDetails.data.external_urls.spotify,
            duration : trackDuration
        }
        
    } catch (error) {
        throw new spotifyError('Invalid Track Link')
    }
    
}

// https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg
// https://open.spotify.com/artist/75VKfyoBlkmrJFDqo1o2VY?si=qGkbRqmTQbGyT9JNsngUEg

const validateSpotifyArtistLink = async( artistLink)=>{
    const artistId = artistLink.split('t/')[1]?.split('?')[0]
    
    const BasicToken = new Buffer.from(clientId + ':' + clientS).toString('base64')

    try {
        const result = await axios.post('https://accounts.spotify.com/api/token', {
            grant_type : 'client_credentials'
        },{
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' + BasicToken
            }
        })

        const token = result.data.access_token

        await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
    
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })

        return;
        
    } catch (error) {
        throw new spotifyError('Invalid Artist Link')
    }
    
}

module.exports = {SpotifyPreview, validateSpotifyArtistLink}