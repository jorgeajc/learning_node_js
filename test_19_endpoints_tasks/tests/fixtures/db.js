const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {User} = require('../../models/users.js')
const {Task} = require('../../models/task.js')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Jorge',
    email: 'jorge@gmail.com',
    password: '12341234',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}
const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: "testing",
    completed: true,
    owner: userOne._id
}

const setupDB = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new Task(taskOne).save()
}

module.exports = {
    userOneId,
    userOne,
    setupDB
}