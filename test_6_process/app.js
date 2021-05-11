const getNotes = require('../test_3_export_module_get_value/utils.js')
const notes = getNotes()
const command = process.argv[2]
const title =  process.argv[3]
if(command == "add" ) {
    console.log('Adding note', title)
} else if(command == "remove" ) {
    console.log('Removing note', title)
} else if(command == "update" ) {
    console.log('Updating note', title)
} else if(command == "get" ) {
    console.log('geting note', title)
}