require('dotenv').config()
console.log(process.env.demo)

var express = require('express')
var pug = require('pug')
var app = express();
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

app.set('view engine', 'pug');

var db = require('./db')

var routerUser = require('./router/router_user')
var routerLogin = require('./router/login_router')
var requireLogin = require('./controller/login_controller')
var product = require('./router/product_router')

app.use(cookieParser(process.env.demo))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(req,res) {
    res.render('home')
});

app.use('/user', requireLogin.requireLogin ,routerUser)
app.use('/login', routerLogin)
app.use('/product', product)

app.listen(14, () => console.log(`http://localhost:${14}/`))