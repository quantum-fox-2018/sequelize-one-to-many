var express = require('express')
var router = express.Router()
const models = require('../models');


router.get('/students', function(req,res){

  models.Student.findAll({order: [['id', 'ASC']]}).then(students=>{
    res.render('student.ejs', { data_students: students})
  })
})

router.get('/students/add', function(req,res){
  res.render('add_student_form.ejs')
})

router.post('/students/add', function(req,res){
  let firstname = req.body.first_name
  let lastname = req.body.last_name
  let email = req.body.email
  let objNewStudent = {
    firstname: firstname,
    lastname: lastname,
    email: email
  }
  models.Student.create(objNewStudent)
  .then(()=>{
    res.redirect('/students')
  })
})

router.get('/students/edit/:student_id', function(req, res) {

  let studentId = req.params.student_id;
  models.Student.findOne({where: {id: studentId}})
  .then(data_student =>{
    res.render('edit_student', {student: data_student})
  })

});

router.post('/students/edit', (req, res) => {

  let firstname= req.body.first_name
  let lastname= req.body.last_name
  let email= req.body.email
  let student_id= req.body.studentId
  var newData = {
    firstname: firstname,
    lastname: lastname,
    email:email,
    updatedAt: new Date()
  };

  models.Student.update(newData, {where: { id: student_id }})
  .then(()=>{
    res.redirect('/students')
  })

})

router.get('/students/delete/:student_id', function(req,res){

  let studentId = req.params.student_id
  models.Student.destroy({where: {id: studentId}})
  res.redirect('/students')
})


module.exports = router
