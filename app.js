// 模块入口文件
const { json } = require('express')
var express = require('express')
var bodyParser = require('body-parser')

var fs = require('fs')
var router = require('./router.js')
// var template = require('art-template')
var app = express()

// 开放静态资源
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// 配模版引擎
app.engine('html', require('express-art-template'))
app.use(router)
app.listen(3000, function () {
    console.log('running..');
})