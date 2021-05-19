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


    socket.on('join', ({username, room}, callback) => {
        socket.join(room)
        socket.emit('message', generateMessage(`Welcome`))
        socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined`))
        socket.on('disconnect', () => {
            io.to(room).emit('message', generateMessage(`${username} disconnect`))
        })
        socket.on('message', (message, callback) => {
            const filter = new Filter()
            if(filter.isProfane(message)) {
                return callback('Profanity is not allowed')
            }
    
            io.to(room).emit('message', generateMessage(message))
            callback()
        })
        socket.on('location', (coords, callback) => {
            io.to(room).emit('location', generateMessage(`https://google.com/maps?q=${coords.lat},${coords.lon}`))
            callback()
        })
    })
})

server.listen(port, ()=>{
    console.log('server is up on port ' + port)
})