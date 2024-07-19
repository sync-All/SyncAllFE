const axios = require('axios')
require('dotenv').config()

const SpotifyPreview = async(res, trackLink)=>{
    const trackId = trackLink.split('k/')[1].split('?')[0]
    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientS = process.env.SPOTIFY_CLIENT_S
    const BasicToken = new Buffer.from(clientId + ':' + clientS).toString('base64')

    const result = await axios.post('https://accounts.spotify.com/api/token', {
        grant_type : 'client_credentials'
    },{
        header : {
            'Authorization' : 'Basic ' + BasicToken
        }
    })

    const token = result.access_token

    try {
        const trackDetails = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
        
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
        
    } catch (error) {
        return res.status(422).send('Wrong track link, Please Try Again')
    }
    if(!trackDetails.preview_url){
        return res.status(422).send('No preview available for this track, Please try again later')
    }

    return trackDetails.preview_url
}

module.exports = SpotifyPreview