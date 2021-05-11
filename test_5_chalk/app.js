const chalk = require('chalk')

const app = require('../test_3_export_module_get_value/utils.js')

var notes = app()

console.log(chalk.green(notes))
console.log(chalk.green.bold(notes))
console.log(chalk.green.inverse.bold(notes))