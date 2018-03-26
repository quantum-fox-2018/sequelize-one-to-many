const routes = require('express').Router()
const models = require('../models')

routes.get('/', (req, res) => {
  models.Student.findAll()
  .then(students => {
    let obj = {
      heads: ['No', 'First Name', 'Last Name', 'Email'],
      students: students
    }
    res.render('./student/readData', obj)
  })
  .catch(err => {res.send(err)})
})

routes.get('/add', (req, res) => {
  res.render('./student/createForm')
})

routes.post('/add', (req, res) => {
  let data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }
  models.Student.create(data)
  .then(() => {
    res.redirect('/students')
  })
  .catch(err => {res.send(err)})
})

routes.get('/edit/:id', (req, res) => {
  let id = req.params.id
  models.Student.findById(id)
  .then(student => {
    let obj = {student}
    res.render('./student/updateForm', obj)
  })
  .catch(err => {res.send(err)})
})

routes.post('/edit/:id', (req, res) => {
  let idObj = req.params.id
  let obj = req.body
  models.Student.update(
    obj,
    {where: {
      id: idObj
    }}
  )
  .then(() => {
    res.redirect('/students')
  })
  .catch(err => {res.send(err)})
})

routes.get('/delete/:id', (req, res) => {
  let idObj = req.params.id
  models.Student.destroy({
    where: {
      id: idObj
    }
  })
  .then(() => {
    res.redirect('/students')
  })
  .catch(err => {res.send(err)})
})

module.exports = routes