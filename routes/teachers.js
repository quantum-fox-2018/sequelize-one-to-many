const routes = require('express').Router()

const {Teacher} = require('../models')

routes.get('/',function(req,res){
  Teacher.withSubject().then(newDataTeachers=>{
    let obj = {
      teachers: newDataTeachers
    }
    // res.send(newDataTeacher[0].subject)
    res.render('teachers/teachers.ejs',obj)
  })
  // Teacher.findAll().then(teachers=>{
  //   let obj = {
  //     teachers: teachers
  //   }
  //   res.render('teachers/teachers.ejs',obj)
  // })
})

routes.get('/add',function(req,res){
  let errMsg
  if(req.query==null){
    errMsg = null
  } else {
    errMsg = req.query.err
  }
  res.render('teachers/add.ejs',{err:errMsg})
})

routes.post('/add',function(req,res){
  let dataSubjectId = req.body.newSubjectId
  if(dataSubjectId==''){
    dataSubjectId = null
  }
  Teacher.create({
    firstName: req.body.newFirstName,
    lastName: req.body.newLastName,
    email: req.body.newEmail,
    SubjectId: dataSubjectId,
    createdAt: new Date(),
    updatedAt: new Date()
  }).then(()=>{
    res.redirect('/teachers')
  }).catch((err)=>{
    res.redirect(`/teachers/add?err=${err.message}`)
  })
})

routes.get('/:id/edit',function(req,res){
  Teacher.findById(req.params.id)
    .then(teacher=>{
      let obj = {
        id: teacher.id,
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        email: teacher.email,
        SubjectId: teacher.SubjectId
      }
      let errMsg
      if(req.query==null){
        errMsg = null
      } else {
        errMsg = req.query.err
      }
      res.render('teachers/edit.ejs',{obj:obj,err:errMsg})
    })
})

routes.post('/:id/edit',function(req,res){
  let dataSubjectId = req.body.newSubjectId
  if(dataSubjectId==''){
    dataSubjectId = null
  }
  Teacher.update({
    firstName: req.body.newFirstName,
    lastName: req.body.newLastName,
    email: req.body.newEmail,
    SubjectId: dataSubjectId
  },{
    where: {
      id:req.body.id
    }
  }).then(()=>{
    res.redirect('/teachers')
  }).catch(err=>{
    res.redirect(`/teachers/${req.params.id}/edit?err=${err.message}`)
  })
})

routes.get('/:id/delete',function(req,res){
  Teacher.destroy({
    where: {
      id: req.params.id
    }
  }).then(()=>{
    res.redirect('/teachers')
  })
})

module.exports = routes
