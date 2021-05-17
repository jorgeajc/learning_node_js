const express = require('express')
let {User, newUser} = require('../../models/users.js')
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
router.get('/users', async ( req, res ) => {
    try {
        return res.send( await User.find({}) )
    } catch (e) {
        return res.status(400).send( e )
    }
})
router.get('/users/:id', async (req, res) => {
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
        const user = await User.findById(_id)
        // const user = await User.findByIdAndUpdate(_id, body, {new: true, runValidators: true}) 
        if( !user ) {
            return res.status(404).send( ) 
        }
        updates.forEach((up) => user[up] = body[up] )
        await user.save()
        return res.send( user )
    } catch (e) {
        return res.status(400).send( e )
    }
})
router.delete('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findByIdAndDelete(  _id  )  
        if( !user ) {
            return res.status(404).send( ) 
        }
        return res.send( user )
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
        console.log(e)
        return res.status(400).send( e )
    }
})


module.exports = router