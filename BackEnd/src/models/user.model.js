const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    isRegCodeVerified: {
        type: Boolean,
        default: false
    },
    regVerifyCode: {
        type: String,
        default: '',
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
        default: ''
    },
    coverImg: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel