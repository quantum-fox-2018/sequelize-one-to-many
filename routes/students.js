const routes = require('express').Router()

const {Student} = require('../models')

routes.get('/',function(req,res){
  Student.findAll().then(students=>{
    let obj = {
      students: students
    }
    res.render('students/students.ejs',obj)
  })
})

routes.get('/add',function(req,res){
  res.render('students/add.ejs')
})

routes.post('/add',function(req,res){
  Student.create({
    firstName: req.body.newFirstName,
    lastName: req.body.newLastName,
    email: req.body.newEmail,
    createdAt: new Date(),
    updatedAt: new Date()
  }).then(()=>{
    res.redirect('/students')
  }).catch((err)=>{
    console.log(err.message)
  })
})

routes.get('/:id/edit',function(req,res){
  Student.findById(req.params.id)
    .then(student=>{
      let obj = {
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email
      }
      res.render('students/edit.ejs',obj)
    })
})

routes.post('/:id/edit',function(req,res){
  Student.update({
    firstName: req.body.newFirstName,
    lastName: req.body.newLastName,
    email: req.body.newEmail
  },{
    where: {
      id:req.body.id
    }
  }).then(()=>{
    res.redirect('/students')
  }).catch(err=>{
    console.log(err.message)
  })
})

routes.get('/:id/delete',function(req,res){
  Student.destroy({
    where: {
      id: req.params.id
    }
  }).then(()=>{
    res.redirect('/students')
  })
})

module.exports = routes
