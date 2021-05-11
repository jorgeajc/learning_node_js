const fs =require("fs")
const chalk = require('chalk')

// obtener todas las notas
const getNotes = () => console.log( loadNotes() )

// validar el json para cargarle los datos
const addNote = (title, body) => {
    messageBlue('Adding a new note!')
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    if( !duplicateNote ) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        messageGreenInverse('Note added')
    } else {
        messageRedInverse('Title duplicated')
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
        messageGreenInverse('Note deleted')
    } else {
        messageRedInverse('Title not exist')
    }
}

// obtener todo los titulos
const getTitlesNotes = () => {
    const notes = loadNotes()
    notes.forEach(note => {
        messageGreen(note.title)
    });
}

// buscar nota
const getNote = (title) => {
    const notes = loadNotes()
    const note  = notes.find((note) => note.title === title)
    if(note){
        messageWhiteInverse(note.body)
    } else {
        messageRedInverse('Title not exist')
    }
}

const messageGreen = (msg) =>  console.log(chalk.green(msg))
const messageGreenInverse = (msg) =>  console.log(chalk.green.inverse(msg))

const messageRed = (msg) =>  console.log(chalk.red(msg))
const messageRedInverse = (msg) =>  console.log(chalk.red.inverse(msg))

const messageBlue = (msg) =>  console.log(chalk.blue(msg))
const messageBlueInverse = (msg) =>  console.log(chalk.blue.inverse(msg))

const messageWhite = (msg) =>  console.log(chalk.white(msg))
const messageWhiteInverse = (msg) =>  console.log(chalk.white.inverse(msg))

module.exports = {
    getNotes,
    addNote,
    deleteNote,
    getTitlesNotes,
    getNote
}