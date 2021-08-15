var express = require('express')
var fs = require('fs')
var router = express.Router()
var Students = require('./students')
// student 主页面
router.get('/students', function (request, response) {
    // 第二个参数用来把二进制转换成utf8编码
    // fs.readFile('./db.json', 'utf8', function (err, data) {
    //     if (err)
    //         return response.status(500).send('server err')
    //     var student = JSON.parse(data).student
    //     response.render('index.html', {
    //         list: ["yiyi", "yiyi", "yiyi"],
    //         student:student
    //     })
    // })

    // 渲染主页面
    Students.find(function (err, student) {
        if (err) {
            return response.send('500')
        }
        response.render('index.html', {
            list: ["yiyi", "yiyi", "yiyi"],
            student: student
        })

    })
})
// 添加学生页面
router.get('/students/news', function (request, response) {
    response.render('news.html')
})
// 添加学生页面数据处理
router.post('/students/news', function (request, response) {
    // 1.获取数据
    // 2.处理数据
    // 3.发送响应
    console.log(request.body);
})
module.exports = router
