const yargs = require('yargs')
const chalk = require('chalk')

// create
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    handler: function(argv) {
        console.log(chalk.blue('Adding a new note!'))
        console.log('Title: ' + argv.title)
        console.log('Body: ' + argv.body)
    },
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
    handler: function() {
        console.log('Removing a note!')
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
    handler: function() {
        console.log('Geting a new note!')
    }
})

yargs.parse()

