const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const {generateMessage} = require('./utils/messages.js')


const port = process.env.PORT || 3000 
const viewsPath = path.join(__dirname, '../web/resources/views')
const publicPath = path.join(__dirname, '../public')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(viewsPath))
app.use(express.static(publicPath))


io.on('connection', (socket) => {
    socket.on('message', (message, callback) => {
        const filter = new Filter()
        if(filter.isProfane(message)) {
            return callback('Profanity is not allowed')
        }

        io.emit('message', generateMessage(message))
        callback()
    })

    socket.emit('message', generateMessage('Welcome!'))
    socket.broadcast.emit('message', generateMessage('A new user has joined'))

    socket.on('location', (coords, callback) => {
        io.emit('location', generateMessage(`https://google.com/maps?q=${coords.lat},${coords.lon}`))
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('title', generateMessage('A user disconnect'))
    })
})

server.listen(port, ()=>{
    console.log('server is up on port ' + port)
})