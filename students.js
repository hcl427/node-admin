// 此模块自用来处理数据，不关心业务
// 职责：数据的增删改查

var fs = require('fs')
var dbPath = './db.json'
// 增
/**
 * 更新学生
 */
exports.upDataById = function (student, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    // 先取出文件中的student
    var students = JSON.parse(data).student
    // 然后循环students和student匹配id
    students.id = parseInt(students.id)
    var res = students.find(function (item) {
      // 如果传递过来的id和循环的id匹配，那么就返回这一项
      return item.id == student.id
    })
    // 最后把匹配到的那一项改成修改的内容
    for (var key in res) {
      res[key] = student[key]
    }
    // 再次把
    var filedata = JSON.stringify({
      student: students
    })
    fs.writeFile(dbPath, filedata, function (err, data) {
      if (err)
        return callback(err)
      callback(null)
    })
  })
}

// // 调用方法
// upDataById({
//   id:1,
//   name:'',
//   age:'',

// },function(err){

// })


// 删
/**
 * 删除学生
 */
exports.delete = function (id, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).student
    var delId = students.findIndex(item=>{
      return item.id == id
    })
    students.splice(delId,1)
    var fileData = JSON.stringify({
      student: students
    })
    fs.writeFile(dbPath, fileData, function (err, data) {
      if (err)
        return callback(err)
      callback(null)
    })
  })
}
// 改
/*
  保存学生
*/
exports.save = function (studentObj, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).student
    studentObj.id = students.length + 1
    students.push(studentObj)
    var fileData = JSON.stringify({
      student: students
    })
    fs.writeFile(dbPath, fileData, function (err, data) {
      if (err)
        return callback(err)
      callback(null)
    })
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
    callback(null, JSON.parse(data).student)
  })
}

/**
 * 
 * 查询当前一个学生的信息
 */
exports.findById = function (id, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    var student = JSON.parse(data).student
    var res = student.find(item => {
      return item.id == parseInt(id)
    })
    callback(null, res)
  })
}