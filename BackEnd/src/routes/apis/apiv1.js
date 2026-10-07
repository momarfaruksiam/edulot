const authUser = require('../../controllers/authUser')

const apiv1 = require('express').Router()

apiv1.use('/auth-user', authUser)


module.exports = apiv1