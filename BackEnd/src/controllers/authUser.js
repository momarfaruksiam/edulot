const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

const authUser = require('express').Router()

authUser.get('/', async (req, res) => {

    try {
        const authToken = req.cookies.authToken

        if (!authToken) {
            return res.status(401).json({
                success: false,
                message: 'You are not logged in'
            })
        }

        const decoded = jwt.verify(
            authToken,
            process.env.JWT_SECRET_KEY
        )

        const user = await userModel.findOne({ _id: decoded.id })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Authenticated user',
            user
        })
    } catch (error) {
        console.log(error)

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            })
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired'
            })
        }

        res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
})


module.exports = authUser