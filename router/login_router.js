var express = require('express')
var router = express.Router()

var controllerLogin = require('../controller/login_controller')

router.get('/', controllerLogin.Login)
router.post('/', controllerLogin.postLogin)

module.exports = router