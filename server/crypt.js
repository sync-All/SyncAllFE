const crypto = require('crypto')
require('dotenv').config()
const pubKey  = process.env.PUB_KEY
const privKey  = process.env.PRIVATE_KEY


function encryptwithpubKey(key, message){
    const bufferMsg = Buffer.from(message, 'utf-8')

    return crypto.publicEncrypt(key,bufferMsg)
}


const encryptedMsg = encryptwithpubKey(pubKey, 'Howdy fellow')

console.log(encryptedMsg.toString())

function decryptwithprivKey(key, message){
    return crypto.privateDecrypt(privKey,message)
}

console.log(decryptwithprivKey(privKey,encryptedMsg).toString())