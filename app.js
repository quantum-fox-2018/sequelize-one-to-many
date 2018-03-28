const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine', 'ejs');

//routes connection
const routes = require('./routes');
const teacherRoutes = require('./routes/teacher.js')

app.use('/', routes);
app.use('/teacher', teacherRoutes);
//TEACHER CRUD


app.listen(3500,() =>{
  console.log('Connected');
})
