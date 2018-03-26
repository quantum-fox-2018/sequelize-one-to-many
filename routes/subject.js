const routes = require('express').Router()
const models = require('../models')

routes.get('/', (req, res) => {
  models.Subject.findAll()
  .then(subjects => {
    let obj = {
      heads: ['No', 'Subject Name'],
      subjects: subjects
    }
    res.render('./subject/readData', obj)
  })
  .catch(err => {res.send(err)})
})

routes.get('/add', (req, res) => {
  res.render('./subject/createForm')
})

routes.post('/add', (req, res) => {
  let data = {
    subject_name: req.body.subject_name
  }
  models.Subject.create(data)
  .then(() => {
    res.redirect('/subjects')
  })
  .catch(err => {res.send(err)})
})

routes.get('/edit/:id', (req, res) => {
  let id = req.params.id
  models.Subject.findById(id)
  .then(subject => {
    let obj = {subject}
    res.render('./subject/updateForm', obj)
  })
  .catch(err => {res.send(err)})
})

routes.post('/edit/:id', (req, res) => {
  let idObj = req.params.id
  let obj = req.body
  models.Subject.update(
    obj,
    {where: {
      id: idObj
    }}
  )
  .then(() => {
    res.redirect('/subjects')
  })
  .catch(err => {res.send(err)})
})

routes.get('/delete/:id', (req, res) => {
  let idObj = req.params.id
  models.Subject.destroy({
    where: {
      id: idObj
    }
  })
  .then(() => {
    res.redirect('/subjects')
  })
  .catch(err => {res.send(err)})
})

module.exports = routes