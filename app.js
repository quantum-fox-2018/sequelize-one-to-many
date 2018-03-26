const express = require('express');
const app = express();
const db = require('./models');
const bodyParser = require('body-parser')


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}))

//index
app.get('/', function(req, res) {
  res.render('index');
})

//Students
app.get('/students', function(req, res){
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
app.get('/students/add', function(req, res){
  let Result = '';
  res.render('students/addStudent', {Result})
})

app.post('/students/addResult', function(req, res){
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


app.get('/students/edit/:studentId', function(req, res){
  // console.log(req.params.studentId);
  let studentId = req.params.studentId;
  db.Student.findOne({where:{id:studentId}})
    .then(studentData =>{
      // console.log(Results);
      res.render('students/editStudent', {studentData})
    })
    .catch()
})

app.post('/students/editResult/:studentId', function(req, res){
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

app.get('/students/delete/:studentId', function(req, res){
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


//Teachers
app.get('/teachers', function(req, res){
  //eager Loading
  db.Teacher.findAll({
    include:[db.Subject],
    order: [['id', 'ASC']]
  })
    .then(Teachers =>{
      // console.log(Teachers);
      // console.log('--------',Teachers[0].subject);
      res.render('teachers', {Teachers:Teachers, alert:''})
      // res.send(Teachers);
    })
    .catch(err =>{
      res.render('teachers', {Teachers:err, alert:''})
    })
})

app.get('/teachers/add', function (req, res){
  db.Subject.findAll()
    .then(Subject =>{
      // console.log(Subject);
      res.render('teachers/addTeacher', {Subject, message:''})
    })
    .catch()

})

app.post('/teachers/addResult', function(req, res){
  let TeacherData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    SubjectId: req.body.subject,
    createdAt: new Date(),
    updateAt: new Date()
  }
  db.Teacher.create(TeacherData)
    .then(Results =>{
      let alert = `${Results.first_name} has been added`
      // console.log(alert);
      console.log('----------', Result);
      res.render('teachers/addResult', {alert:alert})
    })
    .catch((err) =>{
      console.log(err.message);
      console.log('-------', err);
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
  // console.log(req.body);
})

//edit
app.get('/teachers/edit/:teachersId', function(req, res){
  // console.log(req.params.teachersId);

  let teacher_id = req.params.teachersId;
  db.Teacher.findOne({where:{id:teacher_id}})
    .then(teachersData =>{
      // console.log(teachersData);
      db.Subject.findAll()
        .then(Subject =>{
          // console.log(Subject);
          res.render('teachers/editTeacher', {Subject, teachersData})
        })
        .catch()
      // res.render('teachers/editTeacher', {teachersData})
    })
    .catch(err =>{
      console.log(err);
    })
})

app.post('/teachers/editResult/:teachersId', function(req, res){
  let teacherUpdateData = req.body;
  // console.log(teacherUpdateData);
  // console.log(req.params.teachersId);
  db.Teacher.update(teacherUpdateData,
  {
    where:{id:req.params.teachersId}
  })
    .then(Results =>{
        console.log(Results);
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
        console.log('Error',err.msg);
    })

})

app.get('/teachers/delete/:teachersId', function(req, res){
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


//Subject
app.get('/subjects', function(req, res){
  db.Subject.findAll({include:[db.Teacher]})
    .then(Subject =>{
      // for(let i = 0; i < Subject.length; i++){
      //
      // }
      //   console.log(JSON.stringify(Subject, null, 2));
        res.render('subjects', {Subject});
    })
    .catch()
})

app.get('')



app.listen(3000, function(){
  console.log('Server Started on port 3000');
})














//
