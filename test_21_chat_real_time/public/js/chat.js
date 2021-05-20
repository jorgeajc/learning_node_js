const socket = io()

// elements
var btnSendMsg = document.querySelector('#sendMessage')
var form = document.querySelector('#message-form')
var btnSendLocation = document.querySelector('#send-location')
var inputMessage = document.querySelector('#inputMessage')
var messageAll = document.querySelector('#messages')
var sidebar = document.querySelector('#sidebar')

// template
var template = document.querySelector('#message-template').innerHTML
var templateUser = document.querySelector('#sidebar-template').innerHTML

// variables
const now = new Date()
const formatDate = "D-M-Y h:mm a"

// options
const { username, room } = Qs.parse(location.search, {ignoreQueryPrefix: true})
const autoscroll = () => {
    // new message element
    const newMessage = messageAll.lastElementChild

    // height of the new message
    const newMessageStyles = getComputedStyle(newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = newMessage.offsetHeight + newMessageMargin

    // visiable height
    const visibleHeight = messageAll.offsetHeight

    // height of message container
    const containerHeight = messageAll.scrollHeight

    // How far have i scroll?
    const scrollOffSet = messageAll.scrollTop + visibleHeight

    if( containerHeight - newMessageHeight <= scrollOffSet ) {
        messageAll.scrollTop = messageAll.scrollHeight
    }
}
socket.on('message', (message) => {
    setMessage(message)
    autoscroll()
})

socket.on('location', (link) => {
    setLink(link)
    autoscroll()
})

socket.on('roomData', ({room, users}) => {
    const html = Mustache.render(templateUser, {
        users: users,
    })
    sidebar.innerHTML = html
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
        btnSendLocation.disabled = false
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
        username: message.username,
        message: message.text,
        created_at: date(message.created_at)
    })
    messageAll.insertAdjacentHTML('beforeend', html)
}
const setLink = (link) => {
    const html = Mustache.render(template, {
        username: link.username,
        link: link.text.url,
        place: link.text.place,
        weather: link.text.weather,
        temperature: link.text.temperature,
        icon: link.text.icon,
        created_at: date(link.created_at)
    })
    messageAll.insertAdjacentHTML('beforeend', html)
}

socket.emit('join', { username, room }, (error) => {
    if(error) {
        alert(error)
        location.href = '/'
    }
})

const date = (date) => {
    return moment(date).format(formatDate)
}
