// file system
const fs = require('fs')
// escribir archivo
fs.writeFileSync('notes.txt', 'My first note')
// agregar a archivo existente
fs.appendFileSync('notes.txt', 'Second line')