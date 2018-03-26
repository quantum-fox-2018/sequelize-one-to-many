const routes = require('express').Router()
const Student = require('../controller/student')

routes.get('/', Student.readData)

routes.get('/add', Student.showAddData)
routes.post('/add', Student.createData)

routes.get('/edit/:id', Student.showUpdateData)
routes.post('/edit/:id', Student.updateData)

routes.get('/delete/:id', Student.deleteData)

module.exports = routes