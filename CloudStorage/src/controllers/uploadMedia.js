const uploadMedia = require('express').Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const jwt = require('jsonwebtoken')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const { authToken } = req.cookies

        const decoded = jwt.verify(
            authToken,
            process.env.JWT_SECRET_KEY
        )

        const userId = decoded.id

        console.log('User ID:', userId)

        if (!authToken || !userId)
            return cb(new Error('Invalid user'))

        const folder = file.mimetype.startsWith('image/')
            ? 'images'
            : file.mimetype.startsWith('video/')
                ? 'videos'
                : 'files'

        const uploadDir = path.join(
            __dirname,
            '../files',
            String(userId),
            folder
        )

        fs.mkdirSync(uploadDir, { recursive: true })

        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    },
});



const upload = multer({ storage })

uploadMedia.post('/', upload.single('media'), (req, res) => {
    const file = req.file

    if (!file) {
        return res.status(400).json({
            success: false,
            message: 'No media file received'
        })
    }

    console.log(file)

    res.status(200).json({
        success: true,
        message: 'Media received successfully',
        file
    })
})

module.exports = uploadMedia