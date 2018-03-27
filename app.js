const express = require('express')
var app = express()
const Model = require('./models/index.js')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs')

var routeIndex = require('./routes/index.js');
app.use('/', routeIndex)

//Database students

var routeStudents = require('./routes/students.js');
app.use('/students', routeStudents)

//Untuk database teachers
var routeTeachers = require('./routes/teachers.js');
app.use('/teachers', routeTeachers)


//Untuk database subjects
var routeSubjects = require('./routes/subjects.js');
app.use('/subjects', routeSubjects)

app.listen(3000)
