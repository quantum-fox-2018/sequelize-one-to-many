var express = require('express')
var router = express.Router()
const models = require('../models');

router.get('/teachers', (req, res) => {// untuk '/' berarti ke halaman tertentu

models.Teacher.findAll({order: [['id', 'ASC']]}).then(teachers_data=>{
  res.render('teacher.ejs', { teachers: teachers_data})
  })
})

router.get('/teachers/add', function(req,res){

  res.render('add_teacher.ejs')
})

router.post('/teachers/add/', function(req,res){

  let firstName = req.body.first_name
  let lastName = req.body.last_name
  let email = req.body.email
  let objNewTeacher = {
    firstname: firstName,
    lastname: lastName,
    email: email
  }
  models.Teacher.create(objNewTeacher)
  .then(()=>{
    res.redirect('/teachers')
  })
})

router.get('/teachers/edit/:teacher_id', function(req,res){

  let teacherId = req.params.teacher_id;
    models.Teacher.findOne({where: {id: teacherId}})
      .then(data_teacher =>{
        res.render('edit_teacher', {teacher: data_teacher})
      })
  })

router.post('/teachers/edit', function(req,res){
//console.log('========+',req.body);
  let firstName= req.body.first_name
  let lastName= req.body.last_name
  let email= req.body.email
  let teacher_id= req.body.teacherId

  var newData = {//obj1:obj2 = obj1 harus sama dengan nama dengan coloumn di database
    firstname: firstName,
    lastname: lastName,
    email: email,
    updatedAt: new Date()
  };

  models.Teacher.update(newData, {where: { id:teacher_id}})
  .then(()=>{
    //console.log('========>',newData);
    res.redirect('/teachers')
  })

})

router.get('/teachers/delete/:teacher_id', function(req,res){

  let teacherId = req.params.teacher_id
  models.Teacher.destroy({where: {id: teacherId }})
  res.redirect('/teachers')

})






module.exports = router
