const express = require('express');
const router = express.Router();
const db = require('../models');

//Subject
router.get('/', function(req, res){
  db.Subject.findAll({include:[db.Teacher], order:[['id', 'ASC']]})
    .then(Subject =>{
        res.render('subjects', {Subject});
    })
    .catch()
})

router.get('/add', function(req, res){
  res.render('subjects/addSubject');
})

router.post('/add', function(req, res){
  //res.render('')
  let newSubject = {
    subject_name: req.body.subject_name
  }

  db.Subject.create(newSubject)
  .then(subject =>{
    // res.locals.alert = `Subjects ${subject.subject_name} Berhasil`
    res.redirect('/subjects');
  })
  .catch(err => {
    res.send(err.message);
  })
})

router.get('/edit/:id', function(req, res){
  let subjectId = req.params.id;
  db.Subject.findOne({where:{id:subjectId}})
  .then(subject =>{
    // console.log(subject.id);
    // console.log(subject.subject_name);
    res.render('subjects/editSubject', {subject});
  })
  .catch(err =>{
    res.send(err.message);
  })

})

router.post('/edit/:id', function(req, res){
  let subject = {
    id: req.params.id,
    subject_name: req.body.subject_name
  }

  db.subject.update(subject, {where:{id:req.params.id}})
  .then(()=>{
    res.redirect('/subjects');
  })
  .catch(err =>{
    res.send(err.message);
  })
})


router.get('/delete/:id', function(req, res){
  // res.send(`Id ${req.params.id} di hapus`)
  db.Subject.destroy({where:{id:req.params.id}})
  .then(()=>{
    res.send(`Id ${req.params.id} di hapus`)
  })
  .catch(err =>{
    res.send(err.message);
  })
})

module.exports = router;
