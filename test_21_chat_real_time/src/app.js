const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const {generateMessage} = require('./utils/messages.js')
const { addUser, removeUser, getUser, getUserInRoom } = require('./utils/users.js')
const forecast = require('./utils/geolocation-api.js')


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

        const {error, user } = addUser({id: socket.id,username, room})

        if( error ) return callback(error)

        socket.join(user.room)
        socket.emit('message', generateMessage(`Welcome`, "Admin"))
        socket.broadcast.to(user.room).emit('message', generateMessage("has joined", `${user.username}`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUserInRoom(user.room)
        })
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if( user ) {
            io.to(user.room).emit('message', generateMessage("disconnect", user.username))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUserInRoom(user.room)
            })
        }
    })
    socket.on('message', (message, callback) => {
        const filter = new Filter()
        if(filter.isProfane(message)) {
            return callback('Profanity is not allowed')
        }
        const user = getUser(socket.id)
        io.to(user.room).emit('message', generateMessage(message, user.username))
        callback()
    })
    socket.on('location', (coords, callback) => {
        const user = getUser(socket.id)
        forecast(`${coords.lat}`, `${coords.lon}`, (response) => {
            if( response.error ) {
                socket.emit('message', generateMessage('Your request cannot be processed', "Admin"))
                return false
            }
            if( response.location ) {
                const location = {
                    url: `https://google.com/maps?q=${coords.lat},${coords.lon}`,
                    place: `${response.location.country}, ${response.location.region}, ${response.location.name}.`,
                    weather: response.current.weather_descriptions[0],
                    temperature: `${response.current.temperature} ℃`,
                    icon: response.current.weather_icons[0]
                }
                io.to(user.room).emit('location', generateMessage(location, user.username))
            }
        })
        callback()
    })
})

server.listen(port, ()=>{
    console.log('server is up on port ' + port)
})