const routes = require('express').Router()
const Teacher = require('../controller/teacher')

routes.get('/', Teacher.readData)

routes.get('/add', Teacher.showAddData)
routes.post('/add', Teacher.createData)

routes.get('/edit/:id', Teacher.showUpdateData)
routes.post('/edit/:id', Teacher.updateData)

routes.get('/delete/:id', Teacher.deleteData)


module.exports = routes