let express = require('express');
let router = express.Router();

const cSubject = require('../controllers/ControllerSubject.js');

router.get('/', function(req, res) {
  cSubject.list()
  .then((subjects) => {
    res.render('subject-data', {subjects: subjects});
  })
  .catch(err => {
    console.log(err.message);
  });
});

router.get('/add', function(req, res) {
  res.render('subject-add');
});

router.post('/add', function(req, res) {
  let attributeSubject = {
    subject_name: req.body.subject_name
  };
  cSubject.add(attributeSubject)
  .then(() => {
    res.redirect('/subjects');
  })
});

router.get('/edit/:id', function(req, res) {
  cSubject.findOne(req.params.id)
  .then(function(subject) {
    res.render('subject-edit', {subject: subject})
  })
  .catch(err => {
    console.log(err.message);
  });
});

router.post('/edit/:id', function(req, res) {
  let id = req.params.id;
  let subject_name = req.body.subject_name;
  cSubject.update(id, subject_name)
  .then(function(subject) {
    res.redirect('/subjects');
  })
  .catch(err => {
    console.log(err.message);
  });
});

router.get('/delete/:id', function(req, res) {
  let id = req.params.id;
  cSubject.delete(id)
  .then(function() {
    res.redirect('/subjects');
  })
  .catch(err => {
    console.log(err.message);
  });
});

module.exports = router;
