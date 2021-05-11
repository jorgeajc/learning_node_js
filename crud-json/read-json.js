const fs = require('fs')

const dataBuffer = fs.readFileSync('./crud-json/bookJSON.json')
const dataJson = dataBuffer.toString()
const book = JSON.parse( dataJson )
console.log(book.title)
