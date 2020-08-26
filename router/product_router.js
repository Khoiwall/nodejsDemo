var express = require('express')
var router = express.Router()

var product = require('../controller/product_controller')

router.get('', product.indexProduct)

module.exports = router