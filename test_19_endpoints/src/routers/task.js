const express = require('express')
let {Task, newTask} = require('../../models/task.js')
const router = express.Router()

router.post('/task', async ( req, res ) => {
    const task = newTask(req.body)
    try {
        await task.save()
        return res.status(201).send( task )
    } catch (e) {
        return res.status(400).send( e )
    }
})
router.get('/task', async ( req, res ) => {
    try {
        return res.send( await Task.find({}) )
    } catch (e) {
        return res.status(400).send( e )
    }
})
router.get('/task/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const task = await Task.findById(  _id  )  
        if( !task ) {
            return res.status(404).send( ) 
        }
        return res.send( task )
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
        // const task = await Task.findByIdAndUpdate(_id, body, {new: true, runValidators: true}) 
        const task = await Task.findById(_id)
        if( !task ) {
            return res.status(404).send( ) 
        }
        updates.forEach((up) => task[up] = body[up] )
        await task.save()
        return res.send( task )
    } catch (e) {
        console.log(e)
        return res.status(400).send( e )
    }
})
router.delete('/task/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const task = await Task.findByIdAndDelete(  _id  )  
        if( !task ) {
            return res.status(404).send( ) 
        }
        return res.send( task )
    } catch (e) {
        return res.status(400).send( e )
    }
})

module.exports = router