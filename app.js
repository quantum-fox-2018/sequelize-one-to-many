const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

// ============= index ===============
let routeIndex = require('./routes/index.js');
app.use('/', routeIndex);

// ============= Student =============
let routeStudent = require('./routes/students.js');
app.use('/students', routeStudent);

// ============= Teacher =============
let routeTeacher = require('./routes/teachers.js');
app.use('/teachers', routeTeacher);

// ============= Subject =============
let routeSubject = require('./routes/subjects.js');
app.use('/subjects', routeSubject);

// port
app.listen(3000, () => {
  console.log("connected");
});
