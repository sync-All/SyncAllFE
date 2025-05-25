const jsonwebtoken = require('jsonwebtoken')
require("dotenv").config()

const privKey = process.env.PRIVATE_KEY

function issueJwtConfirmEmail(user){
    const _id = user._id

    const expiresIn = '1h'

    const payload = {
        sub : _id,
        // iat : Date.now()
    }

    const signedToken = jsonwebtoken.sign(payload, privKey, {expiresIn : expiresIn, algorithm : 'RS256'})

    return {
        token : signedToken,
        expires : expiresIn
    }
}

function issueJwtLogin(user){
    const _id = user._id

    const expiresIn = '7d'

    const payload = {
        sub : _id,
        // iat : Date.now()
    }

    const signedToken = jsonwebtoken.sign(payload, privKey, {expiresIn : expiresIn, algorithm : 'RS256'})

    return {
        token : "Bearer " + signedToken,
        expires : expiresIn
    }
}

function issueJwtAdminLogin(user){
    const _id = user._id
    const expiresIn = '7d'

    const payload = {
        sub : _id,
        kid : "admin"
    }

    const signedToken = jsonwebtoken.sign(payload, privKey, {expiresIn : expiresIn, algorithm : 'RS256'})

    return {
        token : signedToken,
        expires : expiresIn
    }
}

function issueJwtForgotPassword(user){
    const _id = user._id

    const expiresIn = 5 * 60 * 1000

    const payload = {
        sub : _id,
        purpose : 'reset',
        role : user.role
    }

    const signedToken = jsonwebtoken.sign(payload, privKey, {expiresIn : expiresIn, algorithm : 'RS256'})

    return {
        token : signedToken,
        expires : expiresIn
    }
}

module.exports = {issueJwtConfirmEmail, issueJwtAdminLogin, issueJwtLogin, issueJwtForgotPassword}