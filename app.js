const db = require('./models')
const express = require('express')
const bodyParser = require('body-parser')
let app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

// Display all teacher data
app.get('/teachers', (req, res) => {
    db.Teacher.findAll({ include: [ db.Subject ], order: [['id', 'ASC']]})
    .then((data) => {
      res.render('teachers/teacher', {teacherData: data})
    })
    .catch((err) => {
      res.send(err.message)
    })
  })

// add teacher
app.get('/teachers/add', (req, res) => {
  db.Teacher.findAll({})
    .then(dataTeacher => {
      db.Subject.findAll({})
      .then(dataSubject => {
        res.render('teachers/add_teacher', {teacherData: dataTeacher, subjectData: dataSubject})
      })
    })
    .catch(err => {
      res.send(err.message)
    })
})

app.post('/teachers/add', (req, res) => {
  db.Subject.findOne({where: {subject_name: req.body.subject_name}, raw:true})
  .then(subject => {
    db.Teacher.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      subjectId: subject.id
    })
    .then(data => {
      res.redirect('/teachers')
    })
    .catch(err => {
      res.send(err.message)
    })
  })
  
})

// edit teacher
app.get('/teachers/edit/:id', (req, res) => {
  db.Teacher.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      res.render('teachers/edit_teacher', {teacherData: data})
    })
    .catch(err => {
      res.send(err.message)
    })
})

app.post('/teachers/edit/:id', (req, res) => {
  db.Teacher.update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    }, 
    {
    where: {
      id: req.params.id
    }})
    .then(data => {
      res.redirect('/teachers')
    })
    .catch(err => {
      res.send(err.message)
    })
})

// delete teacher
app.get('/teachers/delete/:id', (req, res) => {
  db.Teacher.destroy({
    where: {
      id: req.params.id
    }})
    .then(data => {
      res.redirect('/teachers')
    })
    .catch(err => {
      res.send(err.message)
    })
})

/* =============================================================================================== */
  // Display all subject data
  app.get('/subjects', (req, res) => {
      db.Subject.findAll({})
      .then((data) => {
        res.render('subjects/subject', {subjectData: data})
      })
      .catch((err) => {
        res.send(err.message)
      })
    })
  
  // add subject
  app.get('/subjects/add', (req, res) => {
    db.Teacher.findAll({})
      .then(data => {
        res.render('subjects/add_subject', {subjectData: data})
      })
      .catch(err => {
        res.send(err.message)
      })
  })
  
  app.post('/subjects/add', (req, res) => {
    db.Subject.create({
      subject_name: req.body.subject_name
    })
    .then(data => {
      res.redirect('/subjects')
    })
    .catch(err => {
      res.send(err.message)
    })
  })

  // edit subject
app.get('/subjects/edit/:id', (req, res) => {
  db.Subject.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      res.render('subjects/edit_subject', {subjectData: data})
    })
    .catch(err => {
      res.send(err.message)
    })
})

app.post('/subjects/edit/:id', (req, res) => {
  db.Subject.update({
      subject_name: req.body.subject_name
    }, 
    {
    where: {
      id: req.params.id
    }})
    .then(data => {
      res.redirect('/subjects')
    })
    .catch(err => {
      res.send(err.message)
    })
})

// delete teacher
app.get('/subjects/delete/:id', (req, res) => {
  db.Subject.destroy({
    where: {
      id: req.params.id
    }})
    .then(data => {
      res.redirect('/subjects')
    })
    .catch(err => {
      res.send(err.message)
    })
})

app.listen(4000)