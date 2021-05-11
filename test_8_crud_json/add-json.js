const fs = require('fs')
const notes = require('./notes.js')

const book = {
    title: 'Hola',
    body: 'Como estas'
}

const dataJsonString = JSON.stringify(book)
fs.writeFileSync('./test_8_crud_json/bookJSON.json', dataJsonString)


