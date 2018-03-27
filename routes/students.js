let express = require('express');
let router = express.Router();
const studentHelper = require('../helpers/student_helper');
const cStudent = require('../controllers/ControllerStudent.js');

router.get('/', function(req, res) {
  studentHelper.listStudent((students) => {
    res.render('student-data', {students: students});
  })
});

router.get('/add', function(req, res) {
  res.render('student-add');
});

router.post('/add', function(req, res) {
  let attributeStudent = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  };
  cStudent.add(attributeStudent)
  .then(() => {
    res.redirect('/students');
  })
});

router.get('/edit/:id', function(req, res) {
  cStudent.findOne(req.params.id)
  .then(function(student) {
    res.render('student-edit', {student: student})
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
  cStudent.update(id, first_name, last_name, email)
  .then(function(student) {
    res.redirect('/students');
  })
  .catch(err => {
    console.log(err.message);
  });
});

router.get('/delete/:id', function(req, res) {
  let id = req.params.id;
  cStudent.delete(id)
  .then(function() {
    res.redirect('/students');
  })
  .catch(err => {
    console.log(err.message);
  });
});

module.exports = router;
