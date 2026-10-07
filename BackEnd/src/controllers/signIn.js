const signIn = require('express').Router()

signIn.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'i am from sign in route'
    })
})

module.exports = signIn