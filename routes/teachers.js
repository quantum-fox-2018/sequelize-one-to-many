const express = require('express');
const router  = express.Router();
const models  = require('../models');
//helpers
const getSubjects = require('../helpers/get_subject_helper.js');
const assignSubjects  = require('../helpers/assign_subject_helper.js');

router.get('/', (req, res) => {
  res.locals.assignSubjects = assignSubjects;

  models.Teacher
  .findAll({
    order: [['id', 'ASC']],
    include: [{ model: models.Subject }]
  })
  .then(teachers => {
    console.log(teachers.Subject);
    res.render('teacher/teachers', {teachers: teachers})
  })
  .catch(error => {
    console.log(error.message);
  })
})

router.get('/add', (req, res) => {
  getSubjects(subjects => {
    res.render('teacher/add', {subjects: subjects})
  })
})

router.post('/add', (req, res) => {
  models.Teacher
  .build({
    first_name  : req.body.first_name,
    last_name   : req.body.last_name,
    gender      : req.body.gender,
    email       : req.body.email,
    SubjectId   : req.body.SubjectId
  })
  .save()
  .then(success => {
    res.render('teacher/add_success', {teacher: req.body})
  })
  .catch(error => {
    getSubjects(subjects => {
      res.render('teacher/add', {subjects: subjects, error: error.message})
    })
  })
})

router.get('/edit/:id', (req, res) => {
  let id = req.params.id;

  models.Teacher
  .findById(id, {
    include: [{model: models.Subject}]
  })
  .then(teacher => {
    models.Subject
    .findAll()
    .then(subjects => {
      res.render('teacher/edit', {teacher: teacher, subjects: subjects})
    })
    .catch(error => {
      console.log(error.message);
    })
  })
  .catch(error => {
    console.log(error.message);
  })
})

router.post('/edit/:id', (req, res) => {
  let newData = {
    id          : req.params.id,
    first_name  : req.body.first_name,
    last_name   : req.body.last_name,
    gender      : req.body.gender,
    email       : req.body.email,
    SubjectId   : req.body.SubjectId,
    name_prefix : null
  }

  models.Teacher
  .update(newData, {where: {id: newData.id}})
  .then(success => {
    res.render('teacher/edit_success', {teacher: req.body})
  })
  .catch(error => {
    getSubjects(subject => {
      res.render('teacher/edit', {
        subject: subject,
        teacher: req.body,
        error: error.message
      })
    })
  })
})

router.get('/delete/:id', (req, res) => {
  models.Teacher
  .destroy({where: {id: req.params.id}})
  .then(success => {
    res.redirect('/teachers');
  })
  .catch(error => {
    console.log(error.message);
  })
})

module.exports = router;
