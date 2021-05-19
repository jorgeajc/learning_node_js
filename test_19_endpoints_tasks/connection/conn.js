const mongoose = require('mongoose')

const mongooseOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}
mongoose.connect(process.env.MONGODB_HOST, mongooseOptions)

module.exports = mongoose 