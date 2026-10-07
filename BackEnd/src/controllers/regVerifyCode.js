const userModel = require('../models/user.model')

const regVerifyCode = require('express').Router()

regVerifyCode.post('/', async (req, res) => {
    const { email, code } = req.body
    console.log(email + code)
    try {
        const user = await userModel.findOne({ email })
        if (!user)
            return res.status(500).json({
                success: false,
                message: 'Please follow the rule'
            })

        if (user.isRegCodeVerified)
            return res.status(400).json({
                success: false,
                message: 'User is already verified'
            })
        const fiveMinutes = 5 * 60 * 1000
        if (Date.now() - user.updatedAt.getTime() > fiveMinutes) {
            await userModel.deleteOne({ _id: user._id })

            return res.status(400).json({
                success: false,
                message: 'Verification code expired'
            })
        }

        if (user.regVerifyCode !== code)
            return res.status(400).json({
                success: false,
                message: 'Code did not matched'
            })

        user.isRegCodeVerified = true
        user.regVerifyCode = ''

        await user.save()

        return res.status(200).json({
            success: true,
            message: 'Email verified successfully'
        })
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: error.message,
            data: {
                email, code
            }
        })
    }


    return res.status(200).json({
        message: 'i got this',
        data: {
            email, code
        }
    })
})

module.exports = regVerifyCode