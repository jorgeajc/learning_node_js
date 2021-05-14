const express = require('express')
let user = require('../models/users.js')
let task = require('../models/task.js')
const port = process.env.PORT || 3000 

const app = express()

app.use(express.json())


// users 
app.post('/users', ( req, res ) => {
    const u = user.newUser(req.body)
    u.save().then( () =>{
        return res.send( u )
    }).catch( (e) => {
        return res.status(400).send( e.errors )
    })
})
app.get('/users', ( req, res ) => {
    user.User.find({}).then((users)=>{
        return res.send( users )
    }).catch((e)=>{
        return res.status(500).send( e )
    })
})
app.get('/users/:id', (req, res) => {
    user.User.findById(req.params.id).then((us)=>{
        if( !us ) {
            return res.status(404).send( )
        }
        return res.send( us )
    }).catch((e)=>{
        return res.status(500).send( e )
    })
})

// task
app.post('/task', ( req, res ) => {
    const t = task.newTask(req.body)
    t.save().then( () =>{
        return res.send( t )
    }).catch( (e) => {
        return res.status(400).send( e )
    })
})


app.listen(port, ()=>{
    console.log('server is up on port ' + port)
})