const express = require('express');
var bodyParser = require('body-parser')
const Router = require('./routers/index');
const RouterStudents = require('./routers/student');
const RouterTeachers = require('./routers/teacher');
const RouterSubjects = require('./routers/subject');

const app = express();

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');


app.use('/', Router);
app.use('/students', RouterStudents);
app.use('/teachers', RouterTeachers);
app.use('/subjects', RouterSubjects);

app.listen(3000, function(){
    console.log('Sistem berjalan di 3000..')
})