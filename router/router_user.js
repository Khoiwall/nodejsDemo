var express = require('express')
var router = express.Router()

var controller = require('../controller/user_controller')
var controllerLogin = require('../controller/login_controller')

router.get('/', controller.index)

router.get('/search', controller.search)

router.get('/creatUser', controller.creatUser)

router.post('/creatUser', controller.checkAddUser, controller.addUser)

router.get('/postAgree' ,controller.postAgree)

router.get('/:id',controller.watchId)

module.exports = router