const getFilesUrl = require('../../controllers/getFilesUrl')
const uploadMedia = require('../../controllers/uploadMedia')
const authUserMiddleware = require('../../middlewares/authUser.middleware')

const apiV1 = require('express').Router()

apiV1.use('/upload-media', authUserMiddleware, uploadMedia)
apiV1.use('/get-file', getFilesUrl)

module.exports = apiV1