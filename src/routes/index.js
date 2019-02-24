const express = require('express')

const photoRoutes = require('./photoRoutes')

const router = express.Router()

router.use('/', photoRoutes)

module.exports = router
