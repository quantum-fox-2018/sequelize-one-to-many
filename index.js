'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const model = require('./models');

let app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));


//================
//TEACHERS
//================
app.get('/teachers', function(req,res){
    model.Teacher.findAll({
        include: [{
            model: model.Subject
        }]
    })
    .then(function(teacherData){
        res.render('teachers', {teacherData: teacherData});
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/teachers/add', function(req, res){
    let message = '';
    res.render('addTeacher', {err: message});
})

app.post('/teachers/add', function(req, res){
    model.Teacher.create({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email
    })
    .then(function(){
        res.redirect('/teachers')
    })
    .catch(function(err){
        // console.log(err.message);
        // let error = err.message;
        res.render('addTeacher', {err: err});
    })
})

app.get('/teachers/edit/:id', function(req, res){
    model.Teacher.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(function(teacherData){
        model.Subject.findAll({})
        .then(function(subjectData){
            res.render('editTeacher', {teacherData: teacherData, subjectData: subjectData});
        })  
    })
    .catch(function(err){
        console.log(err);
    })
})

app.post('/teachers/edit/:id', function(req, res){
    model.Teacher.update({
        SubjectId: req.body.subject,
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
    },{
        where: {id: req.params.id}
    })
    .then(function(){
        res.redirect('/teachers')
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/teachers/delete/:id', function(req, res){
    model.Teacher.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(function(){
        res.redirect('/teachers')
    })
    .catch(function(err){
        console.log(err);
    })
})

//==================
//STUDENTS
//==================
app.get('/students', function(req, res){
    model.Student.findAll()
    .then(function(studentData){
        res.render('students', {studentData: studentData});
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/students/addStudent', function(req, res){
    res.render('addStudent');
})

app.post('/students/addNewStudent', function(req, res){
    model.Student.create({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email
    })
    .then(function(){
        res.redirect('/students');
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/students/edit/:id', function(req, res){
    model.Student.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(function(studentData){
        res.render('editStudent', {studentData});
    })
    .catch(function(err){
        console.log(err);
    })
})

app.post('/students/edit/:id', function(req, res){
    model.Student.update({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
    },{
        where: {id: req.params.id}
    })
    .then(function(){
        res.redirect('/students');
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/students/delete/:id', function(req, res){
    model.Student.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(function(){
        res.redirect('/students');
    })
    .catch(function(err){
        console.log(err);
    })
})

//=====================
//SUBJECTS
//=====================
app.get('/subjects', function(req, res){
    model.Subject.findAll({})
    .then(function(subjectData){
        res.render('subjects', {subjectData});
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/subjects/addSubject', function(req, res){
    res.render('addSubject');
})

app.post('/subjects/addNewSubject', function(req, res){
    model.Subject.create({
        subject_name: req.body.subjectName
    })
    .then(function(){
        res.redirect('/subjects');
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/subjects/editSubject/:id', function(req, res){
    model.Subject.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(function(subjectData){
        res.render('editSubject', {subjectData});
    })
    .catch(function(err){
        console.log(err);
    })
})

app.post('/subjects/edit_subject/:id', function(req, res){
    model.Subject.update({
        subject_name: req.body.subjectName
    },{
        where: {id: req.params.id}
    })
    .then(function(){
        res.redirect('/subjects');
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/subjects/deleteSubject/:id', function(req, res){
    model.Subject.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(function(){
        res.redirect('/subjects');
    })
    .catch(function(err){
        console.log(err);
    })
})

app.listen(3000);