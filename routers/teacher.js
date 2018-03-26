const express = require('express');
const {Teacher,Subject} = require('../models/index')

const router = express.Router();

router.get('/', function(req, res){
    Teacher.findAllWithSubject()
    .then(row => {
        let obj = {
            cssLink: './css/style.css',
            data: row
        };
        res.render('./teachers/teacher.ejs', obj)
    })
})

router.get('/add', function(req, res){
    Subject.findAll()
    .then(subjectRow => {
        let obj = {
            cssLink: '../css/style.css',
            notif: req.query.err,
            subjectOpt: subjectRow
        };
        res.render('./teachers/add-teacher.ejs', obj)
    })
})

router.post('/add', function(req, res){
    Teacher.create({
        first_name: req.body.fname,
        last_name: req.body.lname,
        email: req.body.email,
        SubjectId: req.body.subject,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    .then(row => {
        let obj = {
            notif: `Anda berhasil menambahkan`
        };
        res.redirect('/teachers')
    })
    .catch(err => {
        res.redirect(`/teachers/add?err=${err.message}`)
    })
})

router.get('/edit/:id', function(req, res){
    Teacher.findById(req.params.id)
    .then(row => {
        Subject.findAll()
        .then(subjectRow => {
            let obj = {
                notif: req.query.err,
                data: row,
                subjectOpt: subjectRow
            };
            res.render('./teachers/edit-teacher.ejs', obj)
        })
    })
})

router.post('/update/:id', function(req, res){
    Teacher.update({
        first_name: req.body.fname,
        last_name: req.body.lname,
        email: req.body.email,
        SubjectId: req.body.subject,
        updatedAt: new Date()
    },{
        where: {id: req.params.id}
    })
    .then(() => {
        res.redirect('/teachers')
    })
    .catch(err => {
        // res.send(err.message)
        res.redirect(`/teachers/edit/${req.params.id}?err=${err.message}`)
    })
})

router.get('/delete/:id', function(req, res){
    Teacher.destroy({
        where: { id:req.params.id }
    })
    .then(() => {
        res.redirect('/teachers')
    })
})

module.exports = router;