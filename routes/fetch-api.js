const express = require('express')
const router = express.Router()

const apiController = require('../controller/fetch-api')

router.get('/get-api', apiController.getApi)

router.get('/fetch-api', apiController.fetchApi)

module.exports = router     
