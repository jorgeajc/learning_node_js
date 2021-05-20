const generateMessage = (text, username = 'Anonymous') => {
    return {
        text,
        username,
        created_at: new Date().getTime()
    }
}

module.exports = {
    generateMessage
}