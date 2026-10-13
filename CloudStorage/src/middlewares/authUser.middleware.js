const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    try {
        const { authToken } = req.cookies || {}

        if (!authToken) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required. Please sign in.'
            })
        }

        const decoded = jwt.verify(
            authToken,
            process.env.JWT_SECRET_KEY
        )

        if (!decoded.id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid authentication token'
            })
        }

        req.user = decoded

        next()
    } catch (error) {
        if (
            error.name === 'JsonWebTokenError' ||
            error.name === 'TokenExpiredError' ||
            error.name === 'NotBeforeError'
        ) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired authentication token'
            })
        }

        console.error('Authentication error:', error)

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

module.exports = authMiddleware