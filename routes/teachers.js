var express = require('express')
var router = express.Router()
const Model = require('../models/index.js')
var bodyParser = require('body-parser')
const assigned_subject = require('../helper/assigned_subject.js');

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs')

router.get('/', function(req,res){

  Model.Teacher.findAll({include: [Model.Subject], order: [['id', 'ASC']]}).then(teachers=>{
    let dataTeachers = teachers.map(t => t.dataValues);
    res.locals.assignedSubject = assigned_subject
    res.render('teachers/index.ejs',{data_teachers: dataTeachers})
  })
  .catch(err=>{
    res.render(err.message)
  })
})

router.get('/add', function(req,res){

  Model.Subject.findAll({raw:true})
  .then(subjects=>{
    let emailCond = false;
    res.render('teachers/add.ejs', {subjects:subjects, condition:emailCond})
  })
})

router.post('/add', function(req,res){

  let firstName = req.body.first_name
  let lastName = req.body.last_name
  let email = req.body.email
  let subject = req.body.subject

  Model.Subject.findOne({where: {subject_name:subject}})
  .then(data_subject=>{
    let objNewTeacher = {

      SubjectId: data_subject.id,
      first_name: firstName,
      last_name: lastName,
      email: email,
      createdAt: new Date()
    }

    Model.Teacher.create(objNewTeacher)
    .then((data)=>{
      res.redirect('/teachers')
    })
    .catch(err=>{
      let emailCond = true;
      Model.Subject.findAll()
      .then(subjects=>{
        res.render('teachers/add.ejs', {subjects: subjects, condition: emailCond, message: err.message})
      })
    })


  })
})

router.get('/edit/:teacher_id', function(req,res){

  let teacherId = req.params.teacher_id;
  Model.Teacher.findOne({where: {id: teacherId}})
  .then(data_teacher =>{
    Model.Subject.findAll({raw:true})
    .then(subjects=>{
      let emailCond = false;
      res.render('teachers/edit', {teacher: data_teacher, subjects:subjects, condition:emailCond})
    })
  })

})

router.post('/edit', function(req,res){

  let firstName= req.body.first_name
  let lastName= req.body.last_name
  let email= req.body.email
  let subject = req.body.subject
  let teacher_id= req.body.teacherId

  Model.Subject.findOne({where: {subject_name:subject}, raw:true})
  .then(data_subject=>{
    let newData = {
      id: teacher_id,
      SubjectId: data_subject.id,
      first_name: firstName,
      last_name: lastName,
      email: email,
      updatedAt: new Date()
    }
    Model.Teacher.update(newData, {where: { id: teacher_id }})
    .then(()=>{
      res.redirect('/teachers')
    })
    .catch(err=>{
      let emailCond = true;
      Model.Subject.findAll()
      .then(subjects=>{
        Model.Teacher.findOne({where: {id: teacher_id}})
        .then(data_teacher=>{
          res.render('teachers/edit', {teacher: data_teacher, subjects: subjects, condition: emailCond, message: err.message})
        })
      })
    })
  })
})

router.get('/delete/:teacher_id', function(req,res){

  let teacherId = req.params.teacher_id
  Model.Teacher.destroy({where: {id: teacherId}})
  res.redirect('/teachers')

})

module.exports = router
