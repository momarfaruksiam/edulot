const authUser = require('../../controllers/authUser')
const registration = require('../../controllers/registration')
const regVerifyCode = require('../../controllers/regVerifyCode')
const signIn = require('../../controllers/signIn')
const signOut = require('../../controllers/signOut')
const uploadPost = require('../../controllers/uploadPost')
const authMiddleware = require('../../middlewares/authUser.middleware')

const apiv1 = require('express').Router()

apiv1.use('/auth-user', authUser)
apiv1.use('/sign-in', signIn)
apiv1.use('/sign-out', signOut)
apiv1.use('/registration', registration)
apiv1.use('/registration/verify', regVerifyCode)

apiv1.use('/upload-post', authMiddleware, uploadPost)


module.exports = apiv1