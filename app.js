const express = require('express')
let app = express()
var bodyParser = require('body-parser')
const model = require('./models')

app.use(bodyParser.urlencoded({extended:false}))

app.set('view engine', 'ejs')

app.get('/', function(req, res) {
  res.render('home')
})

app.get('/student', (req, res) => {
  model.Student.findAll()
  .then(function(data_student) {
    res.render('student', {all_student: data_student})
  })
})

app.get('/student/add', (req, res) => {
  res.render('form')
})

app.post('/student/add', (req, res) => {
  res.render('register_success', req.body)
  model.Student.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  })
})

app.get('/student/edit/:id', (req, res) => {
  model.Student.findById(req.params.id)
  .then(function(data_student) {
    res.render('edit_form', {all_student: data_student})
  })
})

app.post('/student/edit/:id', (req, res) => {
  model.Student.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }, {
    where: {id: req.params.id}
  })
  .then(function(edit_data) {
    res.redirect('/student')
  })
})

app.get('/student/delete/:id', (req, res) => {
  model.Student.destroy({
    where: {id: req.params.id}
  })
  .then(function(deleted_data) {
    res.render('delete_success', req.body);
  })
})

app.get('/teacher', (req, res) => {
  model.Teacher.findAll({
    include: [{
      model: model.Subject
    }]
  })
  .then(function(data_teacher) {
    res.render('teacher', {all_teacher: data_teacher})
  })
})

app.get('/teacher/add', (req, res) => {
  res.render('teacher_form')
})

app.post('/teacher/add', (req, res) => {
  res.render('register_success', req.body)
  model.Teacher.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  })
})

app.get('/teacher/edit/:id', (req, res) => {
  model.Teacher.findById(req.params.id)
  .then(function(data_teacher) {
    res.render('edit_form_teacher', {all_teacher: data_teacher})
  })
})

app.post('/teacher/edit/:id', (req, res) => {
  model.Teacher.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }, {
    where: {id: req.params.id}
  })
  .then(function(edit_teacher) {
    res.render('edit_success', req.body)
  })
})

app.get('/teacher/delete/:id', (req, res) => {
  model.Teacher.destroy({
    where: {id: req.params.id}
  })
  .then(function(deleted_teacher) {
    res.render('delete_success', req.body);
  })
})

app.get('/subject', (req, res) => {
  model.Subject.findAll()
  .then(function(data_subject) {
    res.render('subject', {all_subject: data_subject})
  })
})

app.get('/subject/add', (req, res) => {
  res.render('subject_form')
})

app.post('/subject/add', (req, res) => {
  res.render('register_success', req.body)
  model.Subject.create({
    subject_name: req.body.subject_name
  })
})

app.get('/subject/edit/:id', (req, res) => {
  model.Subject.findById(req.params.id)
  .then(function(data_subject) {
    res.render('edit_form_subject', {all_subject: data_subject})
  })
})

app.post('/subject/edit/:id', (req, res) => {
  model.Subject.update({
    subject_name: req.body.subject_name
  }, {
    where: {id: req.params.id}
  })
  .then(function(edit_subject) {
    res.render('edit_success', req.body)
  })
})

app.get('/subject/delete/:id', (req, res) => {
  model.Subject.destroy({
    where: {id: req.params.id}
  })
  .then(function(deleted_subject) {
    res.render('delete_success', req.body);
  })
})

app.listen(3000)
