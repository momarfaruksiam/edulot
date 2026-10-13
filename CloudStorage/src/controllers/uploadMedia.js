const uploadMedia = require('express').Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        const userId = req.user.id

        console.log('User ID:', userId)

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


    const folder = file.mimetype.startsWith('image/')
        ? 'images'
        : file.mimetype.startsWith('video/')
            ? 'videos'
            : 'files'

    const fileUrl = `${process.env.SERVER_NAME}/api/v1/get-file?u=${encodeURIComponent(req.user.id)}&fo=${folder}&fi=${encodeURIComponent(file.filename)}`

    res.status(200).json({
        success: true,
        message: 'Media received successfully',
        fileUrl
    })
})

module.exports = uploadMedia