const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')

const musicUploaderinfo = {
    name : 'Oladimeji Momoh',
    email : 'deemajor230600@gmail.com',
    password : '123456789',
    role : 'Music Uploader',
    userType : 'Individual',
}

const syncUserInfo = {
    name : 'Oladimeji Momoh',
    email : 'Olabisi200023@gmail.com',
    password : '123456789',
    role : 'Sync User',
    userType : 'Individual',
}

describe('Authentication Routes', ()=>{
    it('Should signup a music uploader without hitch', async()=>{
        await request(app)
        .post('/api/v1/signup')
        .send(musicUploaderinfo)
        .expect(200)
        .then((res)=>{
            expect(res.body.success).toBe(true)
        })
    })
    it('Should fail if users try to re-signup with the same email address', async()=>{
        await request(app)
        .post('/api/v1/signup')
        .send(musicUploaderinfo)
        .expect(401)
        .then((res)=>{
            expect(res.body.success).toBe(false)
            expect(res.body.message).toBe('Email Already in use')
        })
    })
    it('Should fail if users try to signup as syncuser with the same emails', async()=>{
        await request(app)
        .post('/api/v1/signup')
        .send({...musicUploaderinfo, role : "Sync User"})
        .expect(401)
        .then((res)=>{
            expect(res.body.success).toBe(false)
            expect(res.body.message).toBe('Email Already in use')
        })
    })
    it('Should signup a synuser hitch free', async()=>{
        await request(app)
        .post('/api/v1/signup')
        .send(syncUserInfo)
        .expect(200)
        .then((res)=>{
            expect(res.body.success).toBe(true)
        })
    })
    it('Should fail if email is already in use', async()=>{
        await request(app)
        .post('/api/v1/signup')
        .send(syncUserInfo)
        .expect(401)
        .then((res)=>{
            expect(res.body.success).toBe(false)
            expect(res.body.message).toBe('Email Already in use')
        })
    })

})

