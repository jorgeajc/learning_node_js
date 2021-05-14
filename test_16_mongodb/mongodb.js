// const mondodb = require('mongodb')
// const MongoCLi = mondodb.MongoClient
// const objectID = mondodb.ObjectID
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://localhost:27017',
      databaseName = 'tas-manager',
      documentUser = 'users',
      documentTask = 'task'

const mongodbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

let db
MongoClient.connect( connectionURL, mongodbOptions, (error, client) => { 
    if( error ) {
        return console.log('Unable to connect to database')
    }
    db = client.db(databaseName)
    // insertUser('Alberto', 23, id)
    // getUserById('609ea38486a4cb3808e94692')
    // getUserByColumn({name:'jorge', age:23});


    // insertTask('Esta es la segunda tarea', false)
    // getTaskById("609ea577ac62b7116407bd8d")
    // getTaskByCompleted(false)
})


const insertUser = (name, age) => {
    db.collection(documentUser).insertOne({
        name: name,
        age: age
    }, ( error, obj ) => {  
        if( error ) {
            return console.log('Unable to insert user')
        }
        console.log( obj.ops )
    })
}
const getUserById = (id) => {
    db.collection(documentUser).findOne({
        _id: new ObjectID(id)
    }, ( error, obj ) => {  
        if( error ) {
            return console.log('Unable to get user')
        }
        console.log( obj )
    })
}
const getUserByColumn = (column = {}) => {
    db.collection(documentUser).find(column).toArray(( error, obj ) => {  
        if( error ) {
            return console.log('Unable to get user')
        }
        console.log( obj )
    })
}

const insertTask = (description, completed) => {
    db.collection(documentTask).insertOne({
        description: description,
        completed: completed
    }, ( error, obj ) => {  
        if( error ) {
            return console.log('Unable to insert task')
        }
        console.log( obj.ops )
    })
}
const getTaskById = (id) => {
    db.collection(documentTask).findOne({
        _id: new ObjectID(id)
    }, ( error, obj ) => {  
        if( error ) {
            return console.log('Unable to get task')
        }
        console.log( obj )
    })
}
const getTaskByCompleted = (completed) => {
    db.collection(documentTask).find({completed: completed}).toArray(( error, obj ) => {  
        if( error ) {
            return console.log('Unable to get task')
        }
        console.log( obj )
    })
}








