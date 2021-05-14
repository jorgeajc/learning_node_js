const mongoose = require('../connection/conn.js')
const documentTask = 'tasks'

const Task = mongoose.model(documentTask, {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: true
    }
})

let newTask = (data) => {
    return new Task({
        description: data.description,
        completed: data.completed
    })
}

module.exports = {
    Task,
    newTask
}