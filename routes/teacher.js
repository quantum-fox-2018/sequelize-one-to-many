const teacher = require('express').Router()

const {Teacher, Subject} = require('../models')

teacher.get('/', (req, res) => {
    // Teacher.findAll({
    //     order: [['id', 'ASC']],
    //     include: [{
    //         model: Subject
    //     }]
    // })
    // .then(dataTeacher => {
    //     res.render('teacher/showTeacher', {teacher: dataTeacher})
    // })
    // .catch(err => {
    //     console.log(err)
    // })
    Teacher.getSubjectName()
    .then( dataTeacher => {
        res.render('teacher/showTeacher', {teacher: dataTeacher})
    })
    .catch(err => {
        console.log(err)
    })

})



teacher.get('/add', (req, res) => {
    let error = ""
    if(req.query.error != ""){
        error = req.query.error
    }
    
    res.render('teacher/formTeacher', {error: error})
})

teacher.post('/add', (req, res) => {
    Teacher.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    })
    .then(newTeacher => {
        console.log('=========',newTeacher)
        res.redirect('/teacher')
    })
    .catch(err => {
        res.redirect(`/teacher/add?error=${err.message}`)
    })
})


teacher.get('/update/:id', (req, res) => {
    Teacher.findById(req.params.id)
    .then(dataTeacher => {
        Subject.findAll()
        .then(dataSubject => {
            res.render('teacher/updateTeacher', {
                data_teacher: dataTeacher,
                data_subject: dataSubject
            })
        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
    })
})

teacher.post('/update/:id', (req, res) => {
    let teacher = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        SubjectId: req.body.SubjectId
    }
    Teacher.update(teacher, {
        where: {
            id: req.params.id
        }
    })
    .then(dataTeacher => {
        console.log('===========', dataTeacher)
        res.redirect('/teacher')
    })
    .catch(err => {
        console.log(err)
    })
})




module.exports = teacher