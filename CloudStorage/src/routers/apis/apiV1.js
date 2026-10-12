const uploadMedia = require('../../controllers/uploadMedia')

const apiV1 = require('express').Router()

apiV1.use('/upload-media', uploadMedia)

module.exports = apiV1