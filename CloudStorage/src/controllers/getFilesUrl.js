const getFilesUrl = require('express').Router()
const path = require('path')
const fs = require('fs')

const filesDir = path.resolve(__dirname, '../files')

getFilesUrl.get('/', (req, res) => {
    try {
        const { u, fo, fi } = req.query

        if (!u || !fo || !fi) {
            return res.status(400).json({
                success: false,
                message: 'User ID, folder, and filename are required'
            })
        }

        if (!['images', 'videos', 'files'].includes(fo)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid folder'
            })
        }

        if (
            typeof u !== 'string' ||
            typeof fi !== 'string' ||
            u !== path.basename(u) ||
            fi !== path.basename(fi) ||
            fi.includes('\\')
        ) {
            return res.status(400).json({
                success: false,
                message: 'Invalid file path'
            })
        }

        const filePath = path.resolve(filesDir, u, fo, fi)

        if (!filePath.startsWith(filesDir + path.sep)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid file path'
            })
        }

        if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
            return res.status(404).json({
                success: false,
                message: 'File not found'
            })
        }

        return res.sendFile(filePath)
    } catch (error) {
        console.error('Get file error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve file'
        })
    }
})

module.exports = getFilesUrl