const express = require('express');
const router  = express.Router();
const models  = require('../models');

router.get('/', (req, res) => {
  models.Student
  .findAll({
    order: [
      ['id', 'ASC']
    ]
  })
  .then(students => {
    res.render('student/students', { students })
  })
  .catch(error => {
    console.log(error.message);
  })
})

router.get('/add', (req, res) => {
  res.render('student/add');
})

router.post('/add', (req, res) => {
  models.Student
  .create({
    first_name  : req.body.first_name,
    last_name   : req.body.last_name,
    email       : req.body.email
  })
  .then(success => {
    res.render('student/add_success', {student: req.body});
  })
  .catch(error => {
    res.render('student/add', {error: error.message})
  })
})

router.get('/edit/:id', (req, res) => {
  let id = req.params.id;

  models.Student
  .findById(id)
  .then(student => {
    res.render('student/edit', { student })
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
    email       : req.body.email
  }
  console.log(newData);

  models.Student
  .update(newData, { where: { id: newData.id } } )
  .then(success => {
    res.render('student/edit_success', { student: req.body})
  })
  .catch(error => {
    res.render('student/edit', {student: req.body, error: error.message})
  })
})

router.get('/delete/:id', (req, res) => {
  models.Student
  .destroy({ where: { id: req.params.id } })
  .then(success => {
    res.redirect('/students');
  })
  .catch(error => {
    console.log(error.message);
  })
})

module.exports = router;
