const express = require('express');
const app = express();
const db = require('./models');
const bodyParser = require('body-parser')
const assignSubject = require('./helper/asignSubject')
const routes = require('./routes');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}))

let index = require('./routes/index');
app.use('/', index);

let studentIndex = require('./routes/students')
app.use('/Students', studentIndex)

let teacherIndex = require('./routes/teachers');
app.use('/teachers', teacherIndex)

let subjectIndex = require('./routes/subjects');
app.use('/subjects', subjectIndex);



app.listen(3100, function(){
  console.log('Server Started on port 3100');
})














//
