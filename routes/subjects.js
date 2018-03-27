const express = require('express');
const router  = express.Router();
const models  = require('../models');

router.get('/', (req, res) => {
  models.Subject
  .findAll({
    order: [['id', 'ASC']],
    include: [{ model: models.Teacher }]
  })
  .then(subjects => {
    res.render('subject/subjects', { subjects: subjects })
  })
  .catch(error => {
    console.log(error.message);
  })
})

router.get('/add', (req, res) => {
  res.render('subject/add');
})

router.post('/add', (req, res) => {
  models.Subject
  .build({
    subject_name : req.body.subject_name
  })
  .save()
  .then(success => {
    res.render('subject/add_success', { subject: req.body });
  })
  .catch(error => {
    console.log(error.message);
  })
})

router.get('/edit/:id', (req, res) => {
  let id = req.params.id;

  models.Subject
  .findById(id)
  .then(subject => {
    res.render('subject/edit', { subject: subject })
  })
  .catch(error => {
    console.log(error.message);
  })
})

router.post('/edit/:id', (req, res) => {
  let newData = {
    id            : req.params.id,
    subject_name  : req.body.subject_name
  }
  console.log(newData);

  models.Subject
  .update(newData, { where: { id: newData.id } } )
  .then(success => {
    res.render('subject/edit_success', { subject: req.body})
  })
  .catch(error => {
    console.log(error.message);
  })
})

router.get('/delete/:id', (req, res) => {
  models.Subject
  .destroy({ where: {id: req.params.id}})
  .then(next => {
    models.Teacher
    .update({SubjectId: null}, {where: {SubjectId: req.params.id}})
    .then(success => {
      res.redirect('/subjects');
    })
    .catch(error => {
      console.log(error.message);
    })
  })
  .catch(error => {
    console.log(error.message);
  })
})

module.exports = router;
