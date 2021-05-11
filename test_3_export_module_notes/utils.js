const fs =require("fs")
const chalk = require('chalk')

// obtener todas las notas
const getNotes = () => loadNotes()

// validar el json para cargarle los datos
const addNote = function(title, body) {
    console.log(chalk.blue('Adding a new note!'))
    const notes = loadNotes()
    const duplicateNotes = notes.filter( (note) => note.title === title )
    if( duplicateNotes.length === 0 ) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('Note added'))
    } else {
        console.log(chalk.red.inverse('Title duplicated'))
    }
}

// guardar datos en json
const saveNotes = function(notes){
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

// buscar el archivo, si lo encuentra lo retorno, de lo contrario retorno array 
const loadNotes = function() {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson   = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch (error) {
        return []   
    }
}

// eliminar nota
const deleteNote = function(title) {
    console.log(chalk.blue('Removing a note!'))
    const notes = loadNotes()
    const notesToKeep = notes.filter( (note) => note.title !== title )
    if(  notesToKeep.length < notes.length ){
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse('Note deleted'))
    } else {
        console.log(chalk.red.inverse('Title not exist'))
    }
}

module.exports = {
    getNotes,
    addNote,
    deleteNote
}