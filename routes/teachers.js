const express = require('express');
const app     = express.Router();
const models  = require('../models');

app.get('/', (req, res) => {
  models.Teacher
  .findAll({
    order: [['id', 'ASC']],
    include: [{ model: models.Subject }]
  })
  .then(teachers => {
    console.log(teachers.Subject);
    res.render('teacher/teachers', { teachers: teachers })
  })
  .catch(error => {
    console.log(error.message);
  })
})

app.get('/add', (req, res) => {
  models.Subject
  .findAll({
    order: [
      ['id', 'ASC']
    ],
  })
  .then(subjects => {
    res.render('teacher/add', { subjects: subjects })
  })
  .catch(error => {
    console.log(error.message);
  })
})

app.post('/add', (req, res) => {
  models.Teacher
  .build({
    first_name  : req.body.first_name,
    last_name   : req.body.last_name,
    email       : req.body.email,
    SubjectId   : req.body.SubjectId
  })
  .save()
  .then(success => {
    res.render('teacher/add_success', { teacher: req.body });
  })
  .catch(error => {
    console.log(error.message);
  })
})

app.get('/edit/:id', (req, res) => {
  let id = req.params.id;

  models.Teacher
  .findById(id, {
    include: [{ model: models.Subject }]
  })
  .then(teacher => {
    models.Subject
    .findAll()
    .then(subjects => {
      res.render('teacher/edit', { teacher: teacher, subjects: subjects })
    })
    .catch(error => {
      console.log(error.message);
    })
  })
  .catch(error => {
    console.log(error.message);
  })
})

app.post('/edit/:id', (req, res) => {
  let newData = {
    id          : req.params.id,
    first_name  : req.body.first_name,
    last_name   : req.body.last_name,
    email       : req.body.email,
    SubjectId   : req.body.SubjectId
  }
  console.log(newData);

  models.Teacher
  .update(newData, { where: { id: newData.id } } )
  .then(success => {
    res.render('teacher/edit_success', { teacher: req.body})
  })
  .catch(error => {
    console.log(error.message);
  })
})

app.get('/delete/:id', (req, res) => {
  models.Teacher
  .destroy({ where: { id: req.params.id } })
  .then(success => {
    res.redirect('/teacher/teachers');
  })
  .catch(error => {
    console.log(error.message);
  })
})

module.exports = app;
