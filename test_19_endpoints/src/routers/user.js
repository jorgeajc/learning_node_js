const express = require('express')
let {User, newUser} = require('../../models/users.js')
const auth = require('../middleware/auth.js')

const router = express.Router()

router.post('/users', async ( req, res ) => {
    const user = newUser(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        return res.status(201).send( {user, token} )
    } catch (e) {
        return res.status(400).send( e )
    }
})
router.get('/users', auth, async ( req, res ) => {
    try {
        return res.send( await User.find({}) )
    } catch (e) {
        return res.status(400).send( e )
    }
})
router.get('/users/me', auth, async ( req, res ) => {
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
        const _id = req.params.id
        req.user.remove()
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


module.exports = router