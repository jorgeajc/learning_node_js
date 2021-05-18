const express = require('express')
let {Task, newTask} = require('../../models/task.js')
const router = express.Router()
const auth = require('../middleware/auth.js')

router.post('/task', auth, async ( req, res ) => {
    const task = newTask( {...req.body, owner: req.user._id})
    try {
        await task.save()
        return res.status(201).send( task )
    } catch (e) {
        return res.status(400).send( e )
    }
})
router.get('/task', auth, async ( req, res ) => {
    try {
        await req.user.populate('tasks').execPopulate()
        return res.send( req.user.tasks )
    } catch (e) {
        return res.status(400).send( e )
    }
})
router.get('/task/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id
        const task = await Task.findOne({_id, owner: req.user._id})
        return res.send( task )
    } catch (e) {
        return res.status(400).send( e )
    }
})
router.patch('/task/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every( (update) => allowedUpdates.includes(update))
    if( !isValidOperation ) {
        return res.status(400).send( {'error': 'invalid update'} )
    }
    try {
        const _id = req.params.id
        const body = req.body
        const task = await Task.findOne({_id, owner: req.user._id })
        if( !task ) {
            return res.status(404).send()
        }
        updates.forEach((up) => task[up] = body[up] )
        await task.save()
        return res.send( task )
    } catch (e) {
        console.log(e)
        return res.status(400).send( e )
    }
})
router.delete('/task/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id
        const task = await Task.findByIdAndDelete({_id, owner: req.user._id }) 
        if( !task ) {
            return res.status(404).send( ) 
        }
        return res.send( task )
    } catch (e) {
        return res.status(400).send( e )
    }
})

module.exports = router