// 此模块自用来处理数据，不关心业务
// 职责：数据的增删改查

var fs = require('fs')
var dbPath = './db.json'
// 增
/**
 * 增加学生
 */
exports.upData = function () {

}
// 删
/**
 * 删除学生
 */
exports.delete = function () {

}
// 改
/*
  保存学生
*/
exports.save = function (studentObj,callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    var students =  JSON.parse(data).students
    students.push(studentObj)
  })
}

// 查
/**
 * 
 * 查询学生
 */
exports.find = function (callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    callback(null, JSON.parse(data).students)
  })
}