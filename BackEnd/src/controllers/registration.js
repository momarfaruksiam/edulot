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
            message: 'Password did not matched'
        })

    try {
        const user = await userModel.findOne({ email })

        if (user)
            return res.status(404).json({
                success: false,
                message: 'User already existsl'
            })

        const saveUser = await userModel.create({
            name,
            email,
            password
        })

        if (saveUser)
            return res.status(200).json({
                success: true,
                message: 'User registered successfully',
                data: {
                    name, email
                }
            })
    } catch (error) {
        return res.status(500).json({
            message: 'Database have some problem',
            data: error
        })
    }
})


module.exports = registration