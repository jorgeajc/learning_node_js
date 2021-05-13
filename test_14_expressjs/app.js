const express = require('express')


const app = express()

app.get('', (req, res)=>{
    res.send('hello')
})

app.get('/help', (req, res)=>{
    res.send('help')
})

app.listen(3000, ()=>{
    console.log('server is up on port 3000')
})