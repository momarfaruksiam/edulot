const transporter = require('../config/mail')
const regVerification = require('../config/messageHtmls/regVerification')
const userModel = require('../models/user.model')

const registration = require('express').Router()

registration.post('/', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body

    if (!name || !email || !password || !confirmPassword)
        return res.status(400).json({
            success: false,
            message: 'Please fill the credentials'
        })

    if (password !== confirmPassword)
        return res.status(400).json({
            success: false,
            message: 'Password did not match'
        })

    try {
        const user = await userModel.findOne({ email })

        if (user) {
            if (!user.isRegCodeVerified) {
                await userModel.deleteOne({ _id: user._id })
            } else
                return res.status(409).json({
                    success: false,
                    message: 'User already exists'
                })
        }

        const regVerifyCode = Math.floor(100000 + Math.random() * 900000).toString()

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verify your email',
            html: regVerification(regVerifyCode)
        })

        await userModel.create({
            name,
            email,
            password,
            regVerifyCode
        })

        return res.status(201).json({
            success: true,
            message: 'Verification code sent to your email',
            data: {
                name,
                email
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

module.exports = registration