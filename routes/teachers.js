const express = require('express')
const router = express.Router();
const db = require('../models');
const assignSubject = require('../helper/asignSubject')

//Teachers
router.get('/', function(req, res){

  res.locals.asignSubject = assignSubject;

  //eager Loading
  db.Teacher.findAll({
    include:[db.Subject],
    order: [['id', 'ASC']]
  })
    .then(Teachers =>{
      // console.log(Teachers[1].Subject);
      // console.log('--------',Teachers[0].subject);
      res.render('teachers', {Teachers:Teachers, alert:''})
      // res.send(Teachers);
    })
    .catch(err =>{
      res.render('teachers', {Teachers:err, alert:''})
    })
})

router.get('/add', function (req, res){
  db.Subject.findAll()
    .then(Subject =>{
      // console.log(Subject);
      res.render('teachers/addTeacher', {Subject, message:''})
    })
    .catch()

})

router.post('/add', function(req, res){
  let TeacherData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    SubjectId: req.body.SubjectId,
    createdAt: new Date(),
    updateAt: new Date()
  }
  // console.log(TeacherData);
  db.Teacher.create(TeacherData)
    .then(Results =>{
      let alert = `${Results.first_name} has been added`
      // // console.log(alert);
      // console.log('----------', Result);
      res.render('teachers/addResult', {alert:alert})
    })
    .catch((err) =>{
      // console.log('-------', err);
      db.Subject.findAll()
      .then(Subject =>{
        let message = err.message;
        res.render('teachers/addTeacher', {Subject, message, TeacherData})
      })
      .catch((err)=>{
        console.log('-------', err);
      })
      // console.log(err.message);
            // res.render('teachers/addResult', {alert:err})
      // res.render('teachers', {Teachers:err, alert:alert})
    })

})

//edit
router.get('/edit/:teachersId', function(req, res){
  // console.log(req.params.teachersId);

  let teacher_id = req.params.teachersId;
  db.Teacher.findOne({where:{id:teacher_id}})
    .then(teachersData =>{
      // console.log(teachersData);
      db.Subject.findAll()
        .then(Subject =>{
          // console.log(Subject);
          let message = '';
          res.render('teachers/editTeacher', {Subject, message, teachersData})
        })
        .catch(err =>{
          db.Subject.findAll()
          .then(Subject =>{
            let message = err.message;
            res.render('teachers/editTeacher', {Subject, message, teachersData})
          })
        })
      // res.render('teachers/editTeacher', {teachersData})
    })
    .catch(err =>{
      console.log(err.message);
    })
})

router.post('/edit/:teachersId', function(req, res){
  // let teacherUpdateData = req.body;
  // console.log(teacherUpdateData);
  let teachersData = {
    id: req.params.teachersId,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    SubjectId: req.body.SubjectId
  }
  res.locals.teachersData = teachersData;
  // console.log(TeachersData);
  db.Teacher.update(teachersData,
  {
    where:{id:req.params.teachersId}
  })
    .then(Results =>{
        // console.log(Results);
        if(Results[0] == 1){
          //update berhasil
          // console.log('Data SuccesFully updated');
          res.render('teachers/editResult');
        }else{
          //update gagal
          console.log('Update Gagal');
        }

    })
    .catch(err =>{
        console.log('Error',err.message);
        db.Subject.findAll()
        .then(Subject =>{
          let message = err.message;
          // console.log('-----------', TeachersData);
          res.render('teachers/editTeacher', {Subject, message})
        })
        .catch((err)=>{
          console.log('-------', err);
        })
    })

})

router.get('/delete/:teachersId', function(req, res){
  let teacher_id = req.params.teachersId;
  // console.log(teacher_id);
  db.Teacher.destroy({where:{id:teacher_id}})
    .then(results =>{
      // console.log(teachersData);
      res.render('teachers/deleteTeacher', {teacher_id})
    })
    .catch(err =>{
      // console.log(err);
    })

})


module.exports = router;
