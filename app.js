const express = require ('express')
const app = express()
const db = require('./models')
const ejs = require('ejs')
const addGelar = require('./helpers/titleHelper')

app.set('view engine', 'ejs')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))



//teacher

app.get('/teachers', (req, res) =>
  db.Teacher.findAll({
    include: [{model: db.Subject}]
  })
  .then(function(data){
    res.locals.toSpd = addGelar
    res.render('teacher_list', {teacherData: data})
  })
)

app.get('/teachers/add', (req, res) =>
  db.Subject.findAll()
  .then(function(data){
    res.render('add_teacher',{subjectData: data, err:"none"})
  })
  .catch(function(error){
    console.log(error.message);
  })
)

app.post('/teachers/add', (req, res) =>
  db.Teacher.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    SubjectId: req.body.subject
  }).then(function(data){
    res.redirect('/teachers')
  }).catch(function(err){
    db.Subject.findAll()
    .then(function(subjectData){
      res.render('add_teacher',{subjectData: subjectData, err:err.message})
    })
  })
)

//edit
app.get('/teachers/edit/:teacherId', (req, res) =>
  db.Teacher.findById(req.params.teacherId)
  .then(function(data){
    db.Subject.findAll()
    .then(function(subjectData){
      res.render('edit_teacher', {teacherData:data, subjectData:subjectData, err:"none"})
    })
  })
)

app.post('/teachers/edit/:id', (req, res) =>
  db.Teacher.update(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      SubjectId: req.body.subject
    },
    {
      where: {id: req.params.id},
    }
  ).then(function(success){
    res.redirect('/teachers')
  }).catch(function(err){
    db.Subject.findAll()
    .then(function(subjectData){
      res.render('edit_teacher', {teacherData:req.body, subjectData:subjectData, err:err.message})
    })
  })
)

//Delete
app.get('/teachers/delete/:id', (req, res) =>
  db.Teacher.destroy({
    where: {id: req.params.id}
  }).then(function(success){
    res.redirect('/teachers')
  })
)


//subjects

app.get('/subjects', (req, res) =>
  db.Subject.findAll({
    include: [{model: db.Teacher}]
  })
  .then(function(data){
    res.render('subject_list' , {subjectData: data})
  })
)

//add
app.get('/subjects/add', (req, res) =>
  res.render('add_subject', {err: "none"})
)

app.post('/subjects/add', (req, res) =>
  db.Subject.create({
    subjectName: req.body.subjectName
  })
  .then(function(data){
    res.redirect('/subjects')
  })
  .catch(function(err){
    res.render('add_subject', {err:err.message})
  })
)

/*app.post('/teachers/edit/:id', (req, res) =>
  db.Teacher.update(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      SubjectId: req.body.subject
    },
    {
      where: {id: req.params.id},
    }
  ).then(function(success){
    res.redirect('/teachers')
  }).catch(function(err){
    db.Subject.findAll()
    .then(function(subjectData){
      res.render('edit_teacher', {teacherData:req.body, subjectData:subjectData, err:err.message})
    })
  })
)*/
//edit
app.get('/subjects/edit/:id', (req, res) =>
  db.Subject.findById(req.params.id)
  .then(function(subjectData){
    res.render('edit_subject', {err:"none", data:subjectData})
  })
)

app.post('/subjects/edit/:id', (req,res) =>
  db.Subject.update(
    {
      subjectName: req.body.subjectName
    },
    {
      where: {id: req.params.id}
    }
  )
  .then(function(success){
  res.redirect('/subjects')
  }).catch(function(err){
  res.render('edit_subject', {err:err.message, data:req.body})
  })
)

//delete
app.get('/subjects/delete/:id', (req, res) =>
  db.Subject.destroy({
    where: {id: req.params.id}
  })
  .then(function(success){
    res.redirect('/subjects')
  })
)


app.listen(3000, () => console.log('express running'))
