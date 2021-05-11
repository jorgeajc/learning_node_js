const fs = require('fs')

const note = {
    title: 'Hola',
    body: 'Como estas'
}

const dataJsonString = JSON.stringify(note)
fs.writeFileSync('notes.json', dataJsonString)


