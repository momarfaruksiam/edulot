const authUser = require('../../controllers/authUser')
const registration = require('../../controllers/registration')

const apiv1 = require('express').Router()

apiv1.use('/auth-user', authUser)
apiv1.use('/registration', registration)


module.exports = apiv1