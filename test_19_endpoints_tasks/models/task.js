const mongoose = require('../connection/conn.js')
const documentTask = 'tasks'

const taskSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users'
    }
},{
    timestamps: true
})

let newTask = (data) => {
    return new Task(data)
}

const Task = new mongoose.model(documentTask, taskSchema)

module.exports = {
    Task,
    newTask
}