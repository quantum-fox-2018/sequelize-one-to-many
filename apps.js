//const models = require('./models');
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine','ejs')

//index passing routes
var routesIndex = require('./routes')
app.use('/', routesIndex)

//teachers passing route
var routesTeacher= require('./routes/teacher')
app.use('/', routesTeacher)

//student passing routes
var routesStudent = require('./routes/student')
app.use('/', routesStudent)

app.listen(3000, () => console.log('Example app listening on port 3000!'))
