const fs = require('fs')

const book = {
    title: 'Hola',
    body: 'Como estas'
}

const dataJsonString = JSON.stringify(book)
fs.writeFileSync('./crud-json/bookJSON.json', dataJsonString)


