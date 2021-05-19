const generateMessage = (text) => {
    return {
        text,
        created_at: new Date().getTime()
    }
}

module.exports = {
    generateMessage
}