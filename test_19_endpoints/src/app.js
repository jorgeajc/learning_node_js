const express = require('express')
let user = require('../models/users.js')
let task = require('../models/task.js')
const port = process.env.PORT || 3000 

const app = express()

app.use(express.json())


// users 
app.post('/users', async ( req, res ) => {
    const u = user.newUser(req.body)
    try {
        await u.save()
        return res.status(201).send( u )
    } catch (e) {
        return res.status(400).send( e )
    }
})
app.get('/users', async ( req, res ) => {
    try {
        return res.send( await user.User.find({}) )
    } catch (e) {
        return res.status(400).send( e )
    }
})
app.get('/users/:id', async (req, res) => {
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
app.patch('/users/:id', async (req, res) => {
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
app.delete('/users/:id', async (req, res) => {
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


// task
app.post('/task', async ( req, res ) => {
    const t = task.newTask(req.body)
    try {
        await t.save()
        return res.status(201).send( t )
    } catch (e) {
        return res.status(400).send( e )
    }
})
app.get('/task', async ( req, res ) => {
    try {
        return res.send( await task.Task.find({}) )
    } catch (e) {
        return res.status(400).send( e )
    }
})
app.get('/task/:id', async (req, res) => {
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
app.patch('/task/:id', async (req, res) => {
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
app.delete('/task/:id', async (req, res) => {
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

app.listen(port, ()=>{
    console.log('server is up on port ' + port)
})