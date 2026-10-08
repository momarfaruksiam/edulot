const signOut = require('express').Router()

signOut.get('/', (req, res) => {
    if (req.cookies) {
        const cookieOptions = {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/'
        }

        Object.keys(req.cookies).forEach((cookieName) => {
            res.clearCookie(cookieName, cookieOptions)
        })
    }

    return res.status(200).json({
        success: true,
        message: 'Signed out successfully!'
    })
})

module.exports = signOut