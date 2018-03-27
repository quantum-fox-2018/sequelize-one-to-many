const express = require('express')
const router = express.Router();
const db = require('../models');

//Students
router.get('/', function(req, res){
  db.Student.findAll()
    .then(Students =>{
        // console.log(Students);
        res.render('students', {Students})
    })
    .catch(err =>{
        res.render('students', err)
    })

})

//Student Add
router.get('/add', function(req, res){
  let Result = '';
  res.render('students/addStudent', {Result})
})

router.post('/addResult', function(req, res){
  let studentAddData = req.body;
  console.log(req.body);
  db.Student.create(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      createdAt: new Date(),
      updateAt: new Date()
    }
  )
    .then(Result =>{
      let alert = `Data ${Result.first_name} Berhasil di tambahkan`
      res.render('students/addResult', {alert})
    })
    .catch(err =>{
      console.log(err);
    })

})


router.get('/edit/:studentId', function(req, res){
  // console.log(req.params.studentId);
  let studentId = req.params.studentId;
  db.Student.findOne({where:{id:studentId}})
    .then(studentData =>{
      // console.log(Results);
      res.render('students/editStudent', {studentData})
    })
    .catch()
})

router.post('/editResult/:studentId', function(req, res){
  // console.log(req.body);
  // console.log(req.params.studentId);
  let studentId = req.params.studentId;
  let StudentEditData = req.body;
  db.Student.update(
    StudentEditData,
    {where:{id:studentId}}
  )
    .then(()=>{
      let msg = `Data ${studentId} Berhasil di Edit`
      res.render('students/editResult', {msg})
    })
    .catch(err=>{
      console.log(err);
    })
})

router.get('/delete/:studentId', function(req, res){
  // console.log(req.params.studentId);
  let studentId = req.params.studentId;
  db.Student.destroy({where:{id:studentId}})
    .then(() =>{
      res.render('students/deleteStudent', {studentId})
    })
    .catch(err =>{
      console.log(err);
    })
    // res.render('students/deleteStudent')
})



module.exports = router;
