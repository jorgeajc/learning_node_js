const mongoose = require('mongoose')

const connectionURL = 'mongodb://localhost:27017',
      databaseName = 'tas-manager'
      

const mongooseOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
mongoose.connect(connectionURL + '/' + databaseName, mongooseOptions)

module.exports = mongoose 