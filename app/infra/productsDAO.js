function ProductsDAO(connection) {
  this._connection = connection
}

ProductsDAO.prototype.list = function (callback) {
  this._connection.query('select * from products', callback)
}

ProductsDAO.prototype.store = function (product, callback) {
  this._connection.query('insert into products set ?', product, callback)
}

module.exports = function () {
  return ProductsDAO
}
