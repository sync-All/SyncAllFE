const axios = require('axios')
require('dotenv').config()
const spotifyError = require('./CustomError').spotifyError

const clientId = process.env.SPOTIFY_CLIENT_ID
const clientS = process.env.SPOTIFY_CLIENT_S

const grabSpotifyToken = async()=>{
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
        return result.data.access_token
    } catch (error) {
        throw new spotifyError(error)
    }

}

const deezerIsrcSearch = async(isrc)=>{
    try {
        const details = await axios.get(`https://api.deezer.com/track/isrc:${isrc}`)
        const previewTrack = details.data.preview
        if(!previewTrack){
            throw new spotifyError('No preview track found')
        }
        return previewTrack
    } catch (error) {
        console.log(error)
        throw new spotifyError('An error occured while fetch track preview, contact dev team')
    }
}

const spotifyResult = async( trackLink, spotifyToken)=>{

    try {
        const trackId = trackLink?.split('k/')[1]?.split('?')[0]
        const trackDetails = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
    
            headers : {
                'Authorization' : `Bearer ${spotifyToken}`
            }
        })

        // if(!trackDetails.data.preview_url){
        //     trackDetails.data.preview_url = await deezerIsrcSearch(trackDetails.data.external_ids.isrc)
        // }

        const minutes = Math.floor(trackDetails.data.duration_ms / 60000);
        const seconds = Math.floor((trackDetails.data.duration_ms % 60000) / 1000);
        const trackDuration = `${String(minutes)} minutes ${String(seconds)} seconds`;
        const artistIds = trackDetails.data.artists.map((item)=> item.id)
        return {
            preview_url : trackDetails.data.preview_url,
            isrc : trackDetails.data.external_ids.isrc,
            spotifyLink : trackDetails.data.external_urls.spotify,
            artwork : trackDetails.data.album.images[0].url,
            duration : trackDuration,
            artistIds
        }
    } catch (error) {
        throw new spotifyError('Invalid spotify link')
    }

}

const SpotifyPreview = async(res, trackLink)=>{
    // const clientId = process.env.SPOTIFY_CLIENT_ID
    // const clientS = process.env.SPOTIFY_CLIENT_S

    try {
        const trackId = trackLink.split('k/')[1]?.split('?')[0]

        const token = await grabSpotifyToken()

        const trackDetails = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
    
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })

        // if(!trackDetails.data.preview_url){
        //     throw new spotifyError('No preview available for this track, Please try again later')
        // }
        const minutes = Math.floor(trackDetails.data.duration_ms / 60000);
        const seconds = Math.floor((trackDetails.data.duration_ms % 60000) / 1000);
        const trackDuration = `${String(minutes)} minutes ${String(seconds)} seconds`;
        const artistIds = trackDetails.data.artists.map((item)=> item.id)
        return {
            preview_url : trackDetails.data.preview_url,
            isrc : trackDetails.data.external_ids.isrc,
            spotifyLink : trackDetails.data.external_urls.spotify,
            artwork : trackDetails.data.album.images[0].url,
            duration : trackDuration,
            explicit_content : trackDetails.data.explicit,
            release_date : trackDetails.data.album.release_date,
            artistIds
        }
        
    } catch (error) {
        console.log(error)
        throw new spotifyError('Invalid Track Link')
    }
}

// https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg
// https://open.spotify.com/artist/75VKfyoBlkmrJFDqo1o2VY?si=qGkbRqmTQbGyT9JNsngUEg

const validateSpotifyArtistLink = async( artistLink)=>{
    const artistId = artistLink.split('t/')[1]?.split('?')[0]

    try {

        const token = await grabSpotifyToken()

        await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
    
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })

        return artistId;
        
    } catch (error) {
        throw new spotifyError('Invalid Artist Link')
    }
    
}

module.exports = {SpotifyPreview, validateSpotifyArtistLink, grabSpotifyToken, spotifyResult}