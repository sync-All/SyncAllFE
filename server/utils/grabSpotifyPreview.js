const axios = require('axios')
require('dotenv').config()
const spotifyError = require('./CustomError').spotifyError
  

const SpotifyPreview = async(res, trackLink)=>{
    const trackId = trackLink.split('k/')[1]?.split('?')[0]
    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientS = process.env.SPOTIFY_CLIENT_S
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
            return res.status(422).send('No preview available for this track or Invalid Link, Please try again later')
        }
        console.log(trackDetails.data)
        return trackDetails.data.preview_url
        
    } catch (error) {
        throw new spotifyError('Invalid Track Link')
    }
    
}

module.exports = SpotifyPreview