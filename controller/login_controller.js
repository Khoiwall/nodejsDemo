var db = require('../db')
var md5 = require('md5')

module.exports.Login = function(req,res){
    res.render('login/indexLogin')
}

module.exports.postLogin = function(req, res, next){
    var email = req.body.email;

    var user = db.get('users').find({'email': email}).value()

    if(!user){
        res.render('login/indexLogin',{
            errors: ['User dose not exist'],
            value: req.body
        })
        return;
    }
    if(user.password !== md5(req.body.password)){
        res.render('login/indexLogin',{
            errors: ['wrong password'],
            value: req.body
        })
        return;
    }

    res.cookie('userId', user.id,{
        signed: true
    })
    res.redirect('/user')

    next()
}

module.exports.requireLogin = function(req,res,next){
    if(!req.signedCookies.userId){
        res.redirect('/login')
        return;
    }

    var user = db.get('users').find({id: req.signedCookies.userId}).value()

    if (!user){
        res.redirect('/login')
        return;
    }

    res.locals.user = user

    next()
}