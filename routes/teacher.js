const routes = require('express').Router()
const models = require('../models')

routes.get('/', (req, res) => {
  models.Teacher.findAll()
  .then(teachers => {
    let obj = {
      heads: ['No', 'First Name', 'Last Name', 'Email'],
      teachers: teachers
    }
    res.render('./teacher/readData', obj)
  })
  .catch(err => {res.send(err)})
})

routes.get('/add', (req, res) => {
  res.render('./teacher/createForm')
})

routes.post('/add', (req, res) => {
  let data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }
  models.Teacher.create(data)
  .then(() => {
    res.redirect('/teachers')
  })
  .catch(err => {res.send(err)})
})

routes.get('/edit/:id', (req, res) => {
  let id = req.params.id
  models.Teacher.findById(id)
  .then(teacher => {
    let obj = {teacher}
    res.render('./teacher/updateForm', obj)
  })
  .catch(err => {res.send(err)})
})

routes.post('/edit/:id', (req, res) => {
  let idObj = req.params.id
  let obj = req.body
  models.Teacher.update(
    obj,
    {where: {
      id: idObj
    }}
  )
  .then(() => {
    res.redirect('/teachers')
  })
  .catch(err => {res.send(err)})
})

routes.get('/delete/:id', (req, res) => {
  let idObj = req.params.id
  models.Teacher.destroy({
    where: {
      id: idObj
    }
  })
  .then(() => {
    res.redirect('/teachers')
  })
  .catch(err => {res.send(err)})
})

module.exports = routes