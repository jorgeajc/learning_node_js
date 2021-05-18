const mongoose = require('mongoose')

const connectionURL = process.env.MONGODB_HOST,
      databaseName = process.env.MONGODB_DATANAME
      

const mongooseOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}
mongoose.connect(connectionURL + '/' + databaseName, mongooseOptions)

module.exports = mongoose 