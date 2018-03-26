'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const model = require('./models');
let app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));

app.get('/teacher', function(req, res){
model.Teacher.findAll({
    // raw: true,
    include:[ model.Subject]
  }).then(teacher_data => {
        res.render('teacher', {teacher_data});
        console.log(teacher_data);
    }).catch(function(err){
            console.log(err);
        })
})

app.get('/teacher/add-teacher', function(req, res){
    res.render('add-teacher');
})

app.post('/teacher/add-teacher', function(req, res){
    model.Teacher.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        SubjectId: req.body.SubjectId
    })
    .then(function(){
        model.Teacher.findAll({include:[ model.Subject]})
        .then((teacher_data) => res.render('teacher', {teacher_data}))
        .catch((err) => console.log(err))
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/teacher/edit-teacher' , function(req, res){
    let id = parseInt(req.query.id);
    model.Teacher.findOne({
      include:[ model.Subject],
        where: {
            id: id
        }
    })
    .then(function(teacher_data){
        res.render('edit-teacher', {teacher_data});
    })
    .catch(function(err){
        console.log(err);
    })
})



app.post('/teacher/edit-teacher', function(req, res){

    let id = parseInt(req.query.id);
    model.Teacher.update({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        SubjectId: parseInt(req.body.SubjectId)
    },{
        where: {id: id}
    })
    .then(function(){
        model.Teacher.findAll({include:[ model.Subject]})
        .then((teacher_data) => res.render('teacher', {teacher_data}))
        .catch((err) => console.log(err))
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/teacher/delete-teacher', function(req, res){
    let id = parseInt(req.query.id);
    model.Teacher.destroy({
        where: {
            id: id
        }
    })
    .then(function(){
        model.Teacher.findAll({include:[ model.Subject]})
        .then((teacher_data) => res.render('teacher', {teacher_data}))
        .catch((err) => console.log(err))
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/subject', function(req, res){
    model.Subject.findAll({})
    .then(function(subject_data){
        res.render('subject', {subject_data});
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/subject/add-subject', function(req, res){
    res.render('add-subject');
})

app.post('/subject/add-subject', function(req, res){
    model.Subject.create({
        subject_name: req.body.subject_name
    })
    .then(function(){
        model.Subject.findAll({})
        .then((subject_data) => res.render('subject', {subject_data}))
        .catch((err) => console.log(err))
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/subject/edit-subject', function(req, res){
    let id = parseInt(req.query.id);
    model.Subject.findOne({
        where: {
            id: id
        }
    })
    .then(function(subject_data){
        res.render('edit-subject', {subject_data});
    })
    .catch(function(err){
        console.log(err);
    })
})

app.post('/subject/edit-subject', function(req, res){
    let id = parseInt(req.query.id);
    model.Subject.update({
        subject_name: req.body.subject_name
    },{
        where: {id: id}
    })
    .then(function(){
        model.Subject.findAll({})
        .then((subject_data) => res.render('subject', {subject_data}))
        .catch((err) => console.log(err))
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/subject/delete-subject', function(req, res){
    let id = parseInt(req.query.id);
    model.Subject.destroy({
        where: {
            id: id
        }
    })
    .then(function(){
        model.Subject.findAll({})
        .then((subject_data) => res.render('subject', {subject_data}))
        .catch((err) => console.log(err))
    })
    .catch(function(err){
        console.log(err);
    })
})

app.listen(3050);
