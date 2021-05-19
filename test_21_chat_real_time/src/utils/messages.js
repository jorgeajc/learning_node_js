const generateMessage = (text, username) => {
    console.log(username)
    return {
        text,
        username: username ? username : 'Anonymous',
        created_at: new Date().getTime()
    }
}

module.exports = {
    generateMessage
}