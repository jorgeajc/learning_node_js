const fs = require('fs')

const dataBuffer = fs.readFileSync('notes.json')
const dataJson = dataBuffer.toString()
const note = JSON.parse( dataJson )

note.title = "Note title edited"
note.body = "Note Body edited"

const noteJSON = JSON.stringify( note )
fs.writeFileSync('notes.json', noteJSON)

console.log(note)
