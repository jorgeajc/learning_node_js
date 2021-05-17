const express = require('express')
let user = require('../../models/users.js')
const router = express.Router()

router.post('/users', async ( req, res ) => {
    const u = user.newUser(req.body)
    try {
        await u.save()
        return res.status(201).send( u )
    } catch (e) {
        return res.status(400).send( e )
    }
})
router.get('/users', async ( req, res ) => {
    try {
        return res.send( await user.User.find({}) )
    } catch (e) {
        return res.status(400).send( e )
    }
})
router.get('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const u = await user.User.findById(  _id  )  
        if( !u ) {
            return res.status(404).send( ) 
        }
        return res.send( u )
    } catch (e) {
        return res.status(400).send( e )
    }
})
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every( (update) => allowedUpdates.includes(update))
    if( !isValidOperation ) {
        return res.status(400).send( {'error': 'invalid update'} )
    }
    try {
        const _id = req.params.id
        const body = req.body
        const u = await user.User.findByIdAndUpdate(_id, body, {new: true, runValidators: true}) 
        if( !u ) {
            return res.status(404).send( ) 
        }
        return res.send( u )
    } catch (error) {
        return res.status(400).send( e )
    }
})
router.delete('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const u = await user.User.findByIdAndDelete(  _id  )  
        if( !u ) {
            return res.status(404).send( ) 
        }
        return res.send( u )
    } catch (e) {
        return res.status(400).send( e )
    }
})
module.exports = router