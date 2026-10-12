const uploadMedia = require('express').Router()



uploadMedia.post('/', (req, res) => {
    res.status(200).json({
        message: 'You got me'
    })
})

module.exports = uploadMedia