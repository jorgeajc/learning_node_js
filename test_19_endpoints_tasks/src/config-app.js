const express = require('express')

const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')

const app = express()

app.use(express.json())
// users 
app.use(userRouter)
// task
app.use(taskRouter)

module.exports = app