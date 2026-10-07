const authUser = require('express').Router()

authUser.get('/', (req, res) => {
    res.status(200).json({
        message: 'i am here from api v1 auth user'
    })
})


module.exports = authUser