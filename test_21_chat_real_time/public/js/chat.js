const socket = io()

// elements
var btnSendMsg = document.querySelector('#sendMessage')
var form = document.querySelector('#message-form')
var btnSendLocation = document.querySelector('#send-location')
var inputMessage = document.querySelector('#inputMessage')
var messageAll = document.querySelector('#messages')
// template
var template = document.querySelector('#message-template').innerHTML

// variables
const now = new Date()
const formatDate = "D-M-Y h:mm a"

// options
const { username, room } = Qs.parse(location.search, {ignoreQueryPrefix: true})

let myName = "Anonymous"

socket.on('message', (message) => {
    setMessage(message)
})

socket.on('location', (link) => {
    setLink(link)
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    var msg = inputMessage.value
    if(!msg) {
        return
    }
    btnSendMsg.disabled = true
    socket.emit('message', msg, (error) => {
        if( error ) {
            return alert('Error: ' + error)
        }
        inputMessage.value = ''
        btnSendMsg.disabled = false
    })  
})
btnSendLocation.addEventListener('click', () => {
    btnSendLocation.disabled = true
    if( !navigator.geolocation ) {
        return alert('Your browser not support geolocation')
    }
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('location', {
            lat: position.coords.latitude,
            lon: position.coords.longitude
        },() => {
            btnSendLocation.disabled = false
        })
    })
})

const setMessage = (message) => {
    const html = Mustache.render(template, {
        myName: myName,
        message: message.text,
        created_at: date(message.created_at)
    })
    messageAll.insertAdjacentHTML('beforeend', html)
}
const setLink = (link) => {
    const html = Mustache.render(template, {
        myName: myName,
        link: link.text,
        created_at: date(link.created_at)
    })
    messageAll.insertAdjacentHTML('beforeend', html)
}

socket.emit('join', { username, room })

const date = (date) => {
    return moment(date).format(formatDate)
}