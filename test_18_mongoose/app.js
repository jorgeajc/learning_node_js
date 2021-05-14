const mongoose = require('mongoose')
const validator = require('validator')

const connectionURL = 'mongodb://localhost:27017',
      databaseName = 'tas-manager',
      documentUser = 'users',
      documentTask = 'tasks'

const mongooseOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
mongoose.connect(connectionURL + '/' + databaseName, mongooseOptions)


const User = mongoose.model(documentUser, {
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(val) {
            if(val < 0) {
                throw new Error('Age mus be greater than 0')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(val) {
            if( !validator.isEmail( val ) ) {
                throw new Error('Email format is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(val) {
            if( !val.toLowerCase().includes('password') ) {
                throw new Error('Password cannot contain password')
            }
        }
    }
})
const insertUser = (columns) => {
    const user = new User(columns)
    user.save()
    .then( () =>{
        console.log(user)
    }).catch( (e) => {
        console.log(e)
    })
}


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
const insertTask = (columns) => {
    const task = new Task(columns)
    task.save()
    .then( () =>{
        console.log(task)
    }).catch( (e) => {
        console.log(e)
    })
}


/* insertUser({
    name: 'Prueba 2',
    age: 1,
    email: 'asd@asd.com',
    password: "123456As7"
}) */
/* insertTask({
    description: 'Prueba task',
    completed: true
}) */
