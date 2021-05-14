const mongoose = require('../connection/conn.js')
const validator = require('validator')
const documentUser = 'users'

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

let newUser = (data) => {
    return new User({
        name: data.name,
        age: data.age,
        email: data.email,
        password: data.password
    })
}

module.exports = {
    User,
    newUser
}
