var express = require('express')
var router = express.Router()
const model = require('../models');
const prefix = require('../helper_add_prefix_teacher.js');

router.get('/', function(req,res){
    res.locals.addPrefix = prefix
    model.Teacher.findAll({
        include: {model: model.Subject}
    })
    .then(function(teacherData){
        res.render('teachers', {teacherData: teacherData});
    })
})

router.get('/add', function(req, res){
    let message = '';
    res.render('addTeacher', {err: message});
})

router.post('/add', function(req, res){
    model.Teacher.create({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email
    })
    .then(function(){
        console.log('---- hasil tidak error')
        res.redirect('/teachers')

    })
    .catch(function(err){
        console.log('---- hasil error')
        
        res.render('addTeacher', {err: err});
    })
})

router.get('/edit/:id', function(req, res){
    model.Teacher.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(function(teacherData){
        let message = '';
        model.Subject.findAll({})
        .then(function(subjectData){
            res.render('editTeacher', {err: message, teacherData: teacherData, subjectData: subjectData});
        })  
    })
    .catch(function(err){
        console.log(err);
    })
})

router.post('/edit/:id', function(req, res){
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
        model.Teacher.findOne({
            where:{id: req.params.id}
        })
        .then(function(teacherData){
            console.log('-------------------error!')
            console.log(JSON.stringify(teacherData));
            model.Subject.findAll()
            .then(function(subjectData){
                res.render('editTeacher', {err: err, teacherData: teacherData, subjectData: subjectData});
            })
        })
    })
})

router.get('/delete/:id', function(req, res){
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

module.exports = router;