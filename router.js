const { response } = require('express')
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
    Students.save(request.body, function (err) {
        if (err)
            return err
        response.redirect('/students')
    })
})

// 处理修改操作  获取当前条的信息，并跳转到对应页面
router.get('/students/edit', function (request, response) {
    // 拿到当前id
    // 1。根据id查询数据
    // 2。渲染edit模版
    Students.findById(request.query.id, function (err, data) {
        if (err)
            return console.log('修改失败');
        response.render('edit.html', {
            student: data
        })
    })

})

router.post('/students/edit', function (request, response) {
    // 拿到当前id
    // 1。根据id查询数据
    // 2.修改数据
    // 3.跳到首页
    Students.upDataById(request.body, function (err) {
        if (err)
            return console.log('修改失败');
        response.redirect('/students')
    })
})
// 删除
router.get('/students/del', function (request, response) {
    // 拿到当前id
    // 1。根据id查询数据
    // 2.修改数据
    Students.delete(request.query.id,function(err,student){
        if(err)
            return console.log('删除失败');
        response.redirect('/students')
    })

})
module.exports = router
