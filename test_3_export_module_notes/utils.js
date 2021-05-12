const fs =require("fs")
const chalk = require('chalk')
const logMessage = require('../test_5_chalk/app.js')

// obtener todas las notas
const getNotes = () => console.log( loadNotes() )

// validar el json para cargarle los datos
const addNote = (title, body) => {
    logMessage.messageBlue('Adding a new note!')
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    if( !duplicateNote ) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        logMessage.messageGreenInverse('Note added')
    } else {
        logMessage.messageRedInverse('Title duplicated')
    }
}

// guardar datos en json
const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

// buscar el archivo, si lo encuentra lo retorno, de lo contrario retorno array 
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson   = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch (error) {
        return []   
    }
}

// eliminar nota
const deleteNote = (title) => {
    console.log(chalk.blue('Removing a note!'))
    const notes = loadNotes()
    const notesToKeep = notes.filter( (note) => note.title !== title )
    if(  notesToKeep.length < notes.length ){
        saveNotes(notesToKeep)
        logMessage.messageGreenInverse('Note deleted')
    } else {
        logMessage.messageRedInverse('Title not exist')
    }
}

// obtener todo los titulos
const getTitlesNotes = () => {
    const notes = loadNotes()
    notes.forEach(note => {
        logMessage.messageGreen(note.title)
    });
}

// buscar nota
const getNote = (title) => {
    const notes = loadNotes()
    const note  = notes.find((note) => note.title === title)
    if(note){
        logMessage.messageWhiteInverse(note.body)
    } else {
        logMessage.messageRedInverse('Title not exist')
    }
}

module.exports = {
    getNotes,
    addNote,
    deleteNote,
    getTitlesNotes,
    getNote
}