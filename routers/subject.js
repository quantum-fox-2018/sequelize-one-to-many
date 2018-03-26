const express = require('express');
const {Subject} = require('../models/index')

const router = express.Router();

router.get('/', function(req, res){
    Subject.findAllWithTeacher()
    .then(row => {
        res.render('./subjects/subject.ejs', {data:row}) 
        // res.send(row[4].teacher)
    })
    
    // Subject.findAll()
    // .then(row => {
    //     let obj = {
    //         title: 'Form Subject',
    //         data: row
    //     };
    //     res.render('./subjects/subject.ejs', obj)    
    // })
})

router.get('/add', function(req, res){
    let obj = {};
    res.render('./subjects/add-subject.ejs', obj)
})

router.post('/add', function(req, res){
    Subject.create({
        subject_name: req.body.sname,
        createdAt: new Date(),
        updatedAT: new Date()
    })
    .then(() => {
        let obj = {};
        res.redirect('/subjects')
    })
})

router.get('/edit/:id', function(req, res){
    Subject.findById(req.params.id)
    .then(row => {
        let obj = {
            title: 'Form Edit Subject',
            data: row
        };
        res.render('./subjects/edit-subject.ejs', obj)
    })
})

router.post('/edit/:id', function(req, res){
    Subject.update({
        subject_name: req.body.sname,
        updatedAT: new Date()
    }, {
        where: { id:req.params.id }
    })
    .then(()=> {
        res.redirect('/subjects')
    })
})

router.get('/delete/:id', function(req, res){
    Subject.destroy({
        where: { id:req.params.id }
    })
    .then(() => {
        res.redirect('/subjects')
    })
})


module.exports = router;