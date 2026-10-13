const uploadPost = require('express').Router()

uploadPost.post('/', (req, res) => {
    const { title, description, fileUrl, postDate } = req.body
    return res.status(200).json({
        success: true,
        message: 'You got me',
        data: { title, description, fileUrl, postDate }
    })
})

module.exports = uploadPost