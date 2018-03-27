var express = require('express')
var router = express.Router()
const Model = require('../models/index.js')
var bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs')

router.get('/',function(req,res){

  Model.Subject.findAll({include: [Model.Teacher],order: [['id', 'ASC']]}).then(subjects=>{
    let data_subjects = subjects.map(s => s.dataValues);
    res.render('subjects/index.ejs', { data_subjects: subjects})
  })
})

router.get('/add', function(req,res){

  res.render('subjects/add.ejs')
})

router.post('/add', function(req,res){

  let subjectName = req.body.subject_name

  let objNewSubject = {
    subject_name: subjectName,
    createdAt: new Date(),
  }
  Model.Subject.create(objNewSubject)
  .then(()=>{
    res.redirect('/subjects')
  })
})

router.get('/edit/:subject_id', function(req,res){

  let subjectId = req.params.subject_id;
  Model.Subject.findOne({where: {id: subjectId}})
  .then(data_subject =>{
    res.render('subjects/edit', {subject: data_subject})
  })

})

router.post('/edit', function(req,res){

  let subjectName= req.body.subject_name
  let subject_id= req.body.subjectId

  var newData = {
    subject_name: subjectName,
    updatedAt: new Date()
  };

  Model.Subject.update(newData, {where: { id: subject_id }})
  .then(()=>{
    res.redirect('/subjects')
  })

})

router.get('/delete/:subject_id', function(req,res){

  let subjectId = req.params.subject_id
  Model.Subject.destroy({where: {id: subjectId}})
  .then(()=>{
    Model.Teacher.findOne({where: {SubjectId: subjectId}})

    res.redirect('/subjects')
  })

})

module.exports = router;
