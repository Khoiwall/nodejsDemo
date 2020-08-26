var db = require('../db')
var shortid = require('shortid')
var md5 = require('md5')

module.exports.index = function(req,res){
    res.render('my_list/index',{
        users: db.get('users').value()
    })
}

module.exports.search = function(req,res){
    var q = req.query.q;

    var searchName = db.get('users').value().filter(user =>{
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })

    res.render('my_list/index',{
        users: searchName
    })
}

module.exports.creatUser = function(req, res){
    res.render('my_list/creatUsers')
}

module.exports.addUser = function(req,res){
    req.body.id = shortid.generate()
    req.body.password = md5(req.body.password)
    db.get('users').push(req.body).write();
    res.render('my_list/postAgree')
}

module.exports.checkAddUser = function(req,res, next){
    var errors = []
    if (!req.body.name || req.body.name.length < 2){
        errors.push('Name is require!')
    }
    if (!req.body.phone || req.body.phone.length != 10){
        errors.push('Phone is require!')
    }
    if (!req.body.email || req.body.email.length < 7){
        errors.push('email is require!')
    }
    if (!req.body.password || req.body.password.length < 8){
        errors.push('password is require!')
    }
    if (errors.length){
        res.render('my_list/creatUsers',{
            errors: errors
        })
        return;
    }

    next()
}

module.exports.postAgree = function(req, res){
    res.render('my_list/postAgree')
}

module.exports.watchId = function(req,res){
    var id = req.params.id;

    var findUser = db.get('users').find({id: id}).value();

    res.render('my_list/person',{
        name: findUser.name
    })
}