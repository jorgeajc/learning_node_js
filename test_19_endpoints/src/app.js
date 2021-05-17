const express = require('express')

const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')

const port = process.env.PORT || 3000 

const app = express()

app.use(express.json())
// users 
app.use(userRouter)
// task
app.use(taskRouter)

app.listen(port, ()=>{
    console.log('server is up on port ' + port)
})