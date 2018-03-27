let express = require('express');
let router = express.Router();

const cTeacher = require('../controllers/ControllerTeacher.js');
const cSubject = require('../controllers/ControllerSubject.js');

router.get('/', function(req, res) {
  cTeacher.FindAllWithSubjectName()
  .then(teachers => {
    res.render('teacher-data', {teachers: teachers})
  })
});

router.get('/add', function(req, res) {
  cSubject.list()
  .then((subjects) => {
    res.render('teacher-add', {subjects: subjects});
  })
});

router.post('/add', function(req, res) {
  let attributeTeacher = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    subject_id: req.body.subject
  };
  cTeacher.add(attributeTeacher)
  .then(() => {
    res.redirect('/teachers');
  })
  .catch(err => {
    cSubject.list()
    .then((subjects) => {
      res.render('teacher-add', {subjects: subjects, err: err.message});
    })
  })
});

router.get('/edit/:id', function(req, res) {
  cTeacher.findOne(req.params.id)
  .then(function(teacher) {
    cSubject.list()
    .then((subjects) => {
      res.render('teacher-edit', {teacher: teacher, subjects: subjects});
    })
  })
  .catch(err => {
    console.log(err.message);
  });
});

router.post('/edit/:id', function(req, res) {
  let id = req.params.id;
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email = req.body.email;
  let subject_id = req.body.subject;
  cTeacher.update(id, first_name, last_name, email, subject_id)
  .then(function() {
    res.redirect('/teachers');
  })
  .catch(err => {
    console.log(err.message);
  });
});

router.get('/delete/:id', function(req, res) {
  let id = req.params.id;
  cTeacher.delete(id)
  .then(function() {
    res.redirect('/teachers');
  })
  .catch(err => {
    console.log(err.message);
  });
});

module.exports = router;
