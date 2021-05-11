const fs = require('fs')

const dataBuffer = fs.readFileSync('./test_8_crud_json/bookJSON.json')
const dataJson = dataBuffer.toString()
const book = JSON.parse( dataJson )
console.log(book)
