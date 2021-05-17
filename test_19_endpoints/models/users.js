const mongoose = require('../connection/conn.js')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const m = async () => {
    const pass = '123Jorge'
    const hashed = await bcrypt.hash(pass, 8)
    const isMatch = await bcrypt.compare(pass, hashed)
}

const documentUser = 'users'
const userSchema = new mongoose.Schema({
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
            /* if( !val.toLowerCase().includes('password') ) {
                throw new Error('Password cannot contain password')
            } */
        }
    }
})

userSchema.statics.findByCredentials = async (email, pass) => {
    const user = await User.findOne({email:email})
    if( !user ){
        throw new Error('Error of credentials')
    }
    const isMatch = await bcrypt.compare(pass, user.password)
    if( !isMatch ) {
        throw new Error('Error of credentials')
    }
    return user
}

userSchema.pre('save', async function(next) {
    const user = this
    if( user.isModified('password') ) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = new mongoose.model('User', userSchema)

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
