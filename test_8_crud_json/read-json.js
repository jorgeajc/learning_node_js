const fs = require('fs')

const dataBuffer = fs.readFileSync('notes.json')
const dataJson = dataBuffer.toString()
const note = JSON.parse( dataJson )
console.log(note)
