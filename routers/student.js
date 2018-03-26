const express = require('express');
const {Student} = require('../models/index')

const router = express.Router();

router.get('/', function(req, res){
    Student.findAll()
    .then(row => {
        let obj = {
            title: 'Students Data',
            data: row
        };
        res.render('./students/student.ejs', obj)
    })
})

router.get('/add', function(req, res){
    let obj = {
        title: 'Form Student'
    };
    res.render('./students/add-student.ejs', obj)
})

router.post('/add', function(req, res){
    Student.create({
        first_name: req.body.fname,
        last_name: req.body.lname,
        email: req.body.email,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    .then(() => {
        res.redirect('/students')
    })    
})

router.get('/edit/:id', function(req, res){
    Student.findById(req.params.id)
    .then(row => {
        let obj = {
            title: 'Form Edit Students',
            data: row
        };
        res.render('./students/edit-student.ejs', obj)
    })
})

router.post('/edit/:id', function(req, res){
    Student.update({
        first_name: req.body.fname,
        last_name: req.body.lname,
        email: req.body.email,
        updatedAt: new Date()
    }, {
        where: { id:req.params.id }
    })
    .then(()=> {
        res.redirect('/students')
    })
})

router.get('/delete/:id', function(req, res){
    Student.destroy({
        where: { id:req.params.id }
    })
    .then(() => {
        res.redirect('/students')
    })
})


module.exports = router;