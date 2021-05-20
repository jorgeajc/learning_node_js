const generateMessage = (text, username = 'Anonymous') => {
    console.log(username)
    return {
        text,
        username,
        created_at: new Date().getTime()
    }
}

module.exports = {
    generateMessage
}