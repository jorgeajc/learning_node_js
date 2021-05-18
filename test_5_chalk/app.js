const chalk = require('chalk')

const messageGreen = (msg) =>  console.log(chalk.green(msg))
const messageGreenInverse = (msg) =>  console.log(chalk.green.inverse(msg))

const messageRed = (msg) =>  console.log(chalk.red(msg))
const messageRedInverse = (msg) =>  console.log(chalk.red.inverse(msg))

const messageBlue = (msg) =>  console.log(chalk.blue(msg))
const messageBlueInverse = (msg) =>  console.log(chalk.blue.inverse(msg))

const messageWhite = (msg) =>  console.log(chalk.white(msg))
const messageWhiteInverse = (msg) =>  console.log(chalk.white.inverse(msg))
module.exports = {
    messageGreen,
    messageGreenInverse,
    messageRed,
    messageRedInverse,
    messageBlue,
    messageBlueInverse,
    messageWhite,
    messageWhiteInverse
}