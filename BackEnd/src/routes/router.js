const apiv1 = require('./apis/apiv1')

const router = require('express').Router()

router.use('/api/v1', apiv1)


module.exports = router