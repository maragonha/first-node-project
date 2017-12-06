module.exports = function (app) {
  app.get('/products', function (request, response) {

    var connection = app.infra.connectionFactory()
    var productsDAO = new app.infra.productsDAO(connection)
    productsDAO.list(function (err, results) {
      response.render('products/list', { list: results })
    })

    connection.end()
  })

  app.get('/products/create', function (request, response) {
    response.render('products/form', {
      errors: {},
      product: {}
    })
  })

  app.post('/products', function (request, response) {
    var product = request.body

    request.assert('title', 'O campo título é obrigatório').notEmpty()
    request.assert('price', 'Format inválido').isFloat()

    var errors = request.validationErrors()
    if (errors) {
      response.render('products/form', {
        errors: errors,
        product: product
      })
      return
    }

    var connection = app.infra.connectionFactory()
    var productsDAO = new app.infra.productsDAO(connection)

    productsDAO.store(product, function (error, result) {
      response.redirect('/products')
    })
  })
}
