var express = require('express')
var router = express.Router()

var db = require('../db')

var controller = require('../controller/user_controller')

router.get('/', controller.index)

router.get('/cookie',function(req,res){
    res.cookie('user-id',1234)
    res.cookie('sd', 'khoimapdit')
    res.send('Khoi Map')
})

router.get('/search', controller.search)

router.get('/creatUser', controller.creatUser)

router.post('/creatUser', controller.checkAddUser, controller.addUser)

router.get('/postAgree' ,controller.postAgree)

router.get('/:id',controller.watchId)

router.get('/:id/deleted', controller.deletedUser)

module.exports = router