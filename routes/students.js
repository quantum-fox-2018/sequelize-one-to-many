var express = require('express')
var router = express.Router()
const Model = require('../models/index.js')
var bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs')


router.get('/', function(req,res){

  Model.Student.findAll({raw:true,order: [['id', 'ASC']]}).then(students=>{
    res.render('students/index.ejs', { data_students: students})
  })
})

router.get('/add', function(req,res){
  res.render('students/add.ejs')
})

router.post('/add', function(req,res){

  let firstName = req.body.first_name
  let lastName = req.body.last_name
  let objNewStudent = {
    first_name: firstName,
    last_name: lastName,
    createdAt: new Date()
  }
  Model.Student.create(objNewStudent)
  .then(()=>{
    res.redirect('students/index.ejs')
  })
})

router.get('/edit/:student_id', function(req, res) {

  let studentId = req.params.student_id;
  Model.Student.findOne({where: {id: studentId}})
  .then(data_student =>{
    res.render('students/edit', {student: data_student})
  })

});

router.post('/edit', (req, res) => {

  let firstName= req.body.first_name
  let lastName= req.body.last_name
  let student_id= req.body.studentId

  var newData = {
    first_name: firstName,
    last_name: lastName,
    updatedAt: new Date()
  };

  Model.Student.update(newData, {where: { id: student_id }})
  .then(()=>{
    res.redirect('students/index')
  })

})

router.get('/delete/:student_id', function(req,res){

  let studentId = req.params.student_id
  Model.Student.destroy({where: {id: studentId}})
  res.redirect('students/index')
})

module.exports = router
