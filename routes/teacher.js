var express = require('express');
var router = express.Router();
const db = require('../models');
const userHelper = require('../helpers/teacher_helpers');
const subjectHelper = require('../helpers/subject_helpers');

router.get('/', function (req, res) {

  userHelper.getTeachersJoinSubject( function (data_teacher) {
    res.render('teacher', {title:'All Teachers Data', teachers : data_teacher})
  })

});

router.get('/add', function(req, res){
  subjectHelper.getAllSubject(function(listSubject){
    res.render('add_teacher', {subjects: listSubject})
  })
})

router.post('/add', function(req, res){
  // console.log('--------',req.body);
  db.Teacher.create({
    subjectId: req.body.subject,
    first_name: req.body.fname,
    last_name: req.body.lname,
    email: req.body.email
  })
  .then( () => {
    res.render('success_message', {data:req.body});
  })
  .catch((err) =>{
    res.render('success_message', {data: err});
  })
})

router.get('/edit/:id', function(req, res){
  db.Teacher.findById(req.params.id)
  .then(function(data_teacher){
    subjectHelper.getAllSubject(function(data_subject){
      res.render('edit_teacher', {teacher: data_teacher, subject: data_subject})
    })
  });
})

router.post('/edit/:id', function(req, res){
  db.Teacher.update({
    subjectId: req.body.subject,
    first_name: req.body.fname,
    last_name: req.body.lname,
    email: req.body.email
  },{
    where: {id: req.params.id},
    individualHooks: true
  })
  .then(() => {
    res.render('success_message', {data: req.body});
  })
  .catch((err) => {
    res.render('success_message', {data: err});
  })
});

router.get('/delete/:id', function(req, res){
    db.Teacher.destroy({
    where: {id: req.params.id}
  })
  .then(function(deleted_teacher) {
    res.render('delete_info', {data: req.body});
  })
  .catch((err) =>{
    res.render('delete_info', {data: err});
  })

})

module.exports = router;
