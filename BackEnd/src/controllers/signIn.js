const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

const signIn = require('express').Router()

signIn.post('/', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password)
        return res.status(400).json({
            success: false,
            message: 'Please enter the credentials'
        })



    try {
        const user = await userModel.findOne({ email })
        if (!user)
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            })

        if (user.password !== password)
            return res.status(404).json({
                success: false,
                message: 'Password did not matched.'
            })

        const authToken = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '7d'
            }
        )

        res.cookie('authToken', authToken)


        res.status(200).json({
            success: true,
            message: 'User logged in successfully!',
            data: {
                name: user.name,
                profileImg: user.profileImg,
            }
        })

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

module.exports = signIn