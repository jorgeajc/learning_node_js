const express = require('express')
let task = require('../../models/task.js')
const router = express.Router()

router.post('/task', async ( req, res ) => {
    const t = task.newTask(req.body)
    try {
        await t.save()
        return res.status(201).send( t )
    } catch (e) {
        return res.status(400).send( e )
    }
})
router.get('/task', async ( req, res ) => {
    try {
        return res.send( await task.Task.find({}) )
    } catch (e) {
        return res.status(400).send( e )
    }
})
router.get('/task/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const t = await task.Task.findById(  _id  )  
        if( !t ) {
            return res.status(404).send( ) 
        }
        return res.send( t )
    } catch (e) {
        return res.status(400).send( e )
    }
})
router.patch('/task/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every( (update) => allowedUpdates.includes(update))
    if( !isValidOperation ) {
        return res.status(400).send( {'error': 'invalid update'} )
    }
    try {
        const _id = req.params.id
        const body = req.body
        const u = await task.Task.findByIdAndUpdate(_id, body, {new: true, runValidators: true}) 
        if( !u ) {
            return res.status(404).send( ) 
        }
        return res.send( u )
    } catch (error) {
        return res.status(400).send( e )
    }
})
router.delete('/task/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const t = await task.Task.findByIdAndDelete(  _id  )  
        if( !t ) {
            return res.status(404).send( ) 
        }
        return res.send( t )
    } catch (e) {
        return res.status(400).send( e )
    }
})

module.exports = router