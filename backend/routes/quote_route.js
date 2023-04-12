const express = require('express')
const motivationalQuote = require('../controllers/quote_controller')
const router = express.Router()
router.post('/', motivationalQuote)

module.exports = router