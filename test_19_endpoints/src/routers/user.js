const express = require('express')
let {User, newUser} = require('../../models/users.js')
const auth = require('../middleware/auth.js')

const {sendWelcomeEmail, sendGoodBayEmail} = require('../emails/account.js')

const sharp = require('sharp')

const multer = require('multer')
const upload = multer({
    // dest: publicPath + '/images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if( !file.originalname.match(/\.(jpg|jpeg|png|svg)$/) ) {
            return cb( new Error('Please upload a images jpg|jpeg|png|svg') )
        }
        cb(undefined, true)
    }
})
const router = express.Router()

router.post('/users', async ( req, res ) => {
    const user = newUser(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        sendWelcomeEmail(user.email, user.name)
        return res.status(201).send( {user, token} )
    } catch (e) {
        return res.status(400).send({Error: e.message})
    }
})
router.get('/users', auth, async ( req, res ) => {
    try {
        return res.send( await User.find({}) )
    } catch (e) {
        return res.status(400).send( e )
    }
})
router.get('/user/me', auth, async ( req, res ) => {
    return res.send( req.user )
})
router.get('/users/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findById(  _id  )  
        if( !user ) {
            return res.status(404).send( ) 
        }
        return res.send( user )
    } catch (e) {
        return res.status(400).send( e )
    }
})
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every( (update) => allowedUpdates.includes(update))
    if( !isValidOperation ) {
        return res.status(400).send( {'error': 'invalid update'} )
    }
    try {
        const body = req.body
        const user = req.user
        updates.forEach((up) => user[up] = body[up] )
        await user.save()
        return res.send( user )
    } catch (e) {
        return res.status(400).send( e )
    }
})
router.delete('/users/me', auth, async (req, res) => {
    try {
        req.user.remove()
        sendGoodBayEmail(req.user.email, req.user.name)
        return res.send( req.user )
    } catch (e) {
        return res.status(400).send( e )
    }
})
router.post('/user/login', async (req, res) => {
    try {
        const body = req.body
        const user = await User.findByCredentials(body.email, body.password)
        const token = await user.generateAuthToken()
        return res.send( {user, token} )
    } catch (e) {
        return res.status(400).send( e )
    }
})
router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter( (token) => {
            return token.token !== req.token
        })
        await req.user.save()
        return res.send( )
    } catch (e) {
        console.log(e)
        return res.status(400).send( e )
    }
})
router.post('/user/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        return res.send( )
    } catch (e) {
        console.log(e)
        return res.status(400).send( e )
    }
})
router.post('/user/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})
router.delete('/user/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})
router.get('/user/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if( !user || !user.avatar ) {
            throw new Error('Without image')
        }
        res.set('Content-type', 'image/png')
        res.send(user.avatar)
    } catch (error) {
        res.status(400).send({Error: error.message})
    }
})

module.exports = router