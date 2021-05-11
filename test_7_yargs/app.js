const yargs = require('yargs')
const chalk = require('chalk')
const notes = require('../test_3_export_module_notes/utils.js')

// create
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    handler: (argv) => notes.addNote(argv.title, argv.body),
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    }
})
// remove
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: (argv) => notes.deleteNote(argv.title),
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    }
})
// edit
yargs.command({
    command: 'edit',
    describe: 'Edit a note',
    handler: function() {
        console.log('Editing a new note!')
    }
})
// get
yargs.command({
    command: 'get',
    describe: 'Get a note',
    handler: () => console.log( notes.getNotes() )
})

yargs.parse()

