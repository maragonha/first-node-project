var mysql = require('mysql')

var connectMYSQL = function createDBConnection () {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'bob',
    database: 'firstnodeproject'
  })
}

module.exports = function () {
  return connectMYSQL
}
