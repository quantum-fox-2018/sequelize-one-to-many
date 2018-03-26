const routes = require('express').Router()
const Subject = require('../controller/Subject')

routes.get('/', Subject.readData)

routes.get('/add', Subject.showAddData)
routes.post('/add', Subject.createData)

routes.get('/edit/:id', Subject.showUpdateData)
routes.post('/edit/:id', Subject.updateData)

routes.get('/delete/:id', Subject.deleteData)

module.exports = routes