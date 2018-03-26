const routes = require('express').Router()

const {Subject} = require('../models')

routes.get('/',function(req,res){
  Subject.findAll().then(subjects=>{
    let obj = {
      subjects: subjects
    }
    res.render('subjects/subjects.ejs',obj)
  })
})

routes.get('/add',function(req,res){
  res.render('subjects/add.ejs')
})

routes.post('/add',function(req,res){
  Subject.create({
    name: req.body.newName,
    createdAt: new Date(),
    updatedAt: new Date()
  }).then(()=>{
    res.redirect('/subjects')
  }).catch((err)=>{
    console.log(err.message)
  })
})

routes.get('/:id/edit',function(req,res){
  Subject.findById(req.params.id)
    .then(subject=>{
      let obj = {
        id: subject.id,
        name: subject.name
      }
      res.render('subjects/edit.ejs',obj)
    })
})

routes.post('/:id/edit',function(req,res){
  Subject.update({
    name:req.body.newName
  },{
    where: {
      id:req.body.id
    }
  }).then(()=>{
    res.redirect('/subjects')
  }).catch(err=>{
    console.log(err.message)
  })
})

routes.get('/:id/delete',function(req,res){
  Subject.destroy({
    where: {
      id:req.params.id
    }
  }).then(()=>{
    res.redirect('/subjects')
  })
})

module.exports = routes
