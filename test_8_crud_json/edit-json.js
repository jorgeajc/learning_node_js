const fs = require('fs')

const dataBuffer = fs.readFileSync('./test_8_crud_json/bookJSON.json')
const dataJson = dataBuffer.toString()
const book = JSON.parse( dataJson )

book.title = "Book title edited"
book.body = "Book Body edited"

const bookJSON = JSON.stringify( book )
fs.writeFileSync('./test_8_crud_json/bookJSON.json', bookJSON)

console.log(book)
