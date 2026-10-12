const apiV1 = require('./apis/apiV1')

const router = require('express').Router()

router.use('/api/v1', apiV1)

module.exports = router