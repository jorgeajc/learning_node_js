const users = []
const rooms = []

const addUser = ({id, username, room}) => {
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    if( !username || !room ) return { error: 'Username and Room are required' } 
    
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    if( existingUser ) return { error: 'Username is in use!' }
    
    const user = {id, username, room}
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const user = getUser(id)
    const index = users.findIndex((user) => user.id === id)
    if( index !== -1) {
        removeRoom(user.room)
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUserInRoom = (room) => {
    return users.filter((user) => user.room === room.trim().toLowerCase())
}

const addRoom = (name) => {
    name = name.trim().toLowerCase()
    
    const existingRoom = rooms.find((room) => {
        return room.name === name
    })

    if( existingRoom ) return { room: existingRoom }
    
    const room = {name}
    rooms.push(room)
    return { room }
}
const getRooms = () => {
    return rooms
}
const removeRoom = (name) => {
    const hasUserInRoom = getUserInRoom(name)
    if( hasUserInRoom.length == 1) {
        const index = rooms.findIndex((room) => room.name === name )
        if( index !== -1) {
            return rooms.splice(index, 1)[0]
        }
    }
}
module.exports = {
    addUser,
    removeUser,
    getUser,
    getUserInRoom,
    addRoom,
    getRooms,
    removeRoom
}