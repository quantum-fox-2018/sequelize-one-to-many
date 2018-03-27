var express = require('express')
var router = express.Router()
const model = require('../models');

router.get('/', function(req, res){
    model.Student.findAll()
    .then(function(studentData){
        res.render('students', {studentData: studentData});
    })
    .catch(function(err){
        console.log(err);
    })
})

router.get('/add', function(req, res){
    res.render('addStudent');
})

router.post('/add', function(req, res){
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

router.get('/edit/:id', function(req, res){
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

router.post('/edit/:id', function(req, res){
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

router.get('/delete/:id', function(req, res){
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


module.exports = router