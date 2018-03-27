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

var routeTeacher = require('./routes/teachers.js');
app.use('/teachers', routeTeacher);

//==================
//STUDENTS
//==================

var routeStudent = require('./routes/students.js');
app.use('/students', routeStudent);

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