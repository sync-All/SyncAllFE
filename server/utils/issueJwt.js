const jsonwebtoken = require('jsonwebtoken')
require("dotenv").config()

const privKey = process.env.PRIVATE_KEY

function issueJwtConfirmEmail(user){
    const _id = user._id

    const expiresIn = '1h'

    const payload = {
        sub : _id,
        iat : Date.now()
    }

    const signedToken = jsonwebtoken.sign(payload, privKey, {expiresIn : expiresIn, algorithm : 'RS256'})

    return {
        token : signedToken,
        expires : expiresIn
    }
}

function issueJwtLogin(user){
    const _id = user._id

    const expiresIn = '1h'

    const payload = {
        sub : _id,
        iat : Date.now()
    }

    const signedToken = jsonwebtoken.sign(payload, privKey, {expiresIn : expiresIn, algorithm : 'RS256'})

    return {
        token : "Bearer " + signedToken,
        expires : expiresIn
    }
}

module.exports.issueJwtConfirmEmail = issueJwtConfirmEmail
module.exports.issueJwtLogin = issueJwtLogin