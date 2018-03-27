const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const Model = require('./models')

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Teachers

function showTeachers(req, res){
    Model.Teacher.findAll({include: [{model:Model.Subject}], order: [['id', 'ASC']]}, {raw: true})
    .then(teachersData =>{
        //get alert value from add
        let alert;
        if(req.alert) alert = req.alert;
        //render
        //console.log('--------',teachersData)
        res.render('teachers',{
            teachersData : teachersData,
            alert:alert
        });
    });   
}

function showTeacherById(req, res){    
    Model.Teacher.findById(req.params.id,{ raw: true })
    .then(teacherData =>{
        res.render('teacher-edit',{
            teacherData : teacherData
        });
    }); 
}

function addNewTeacher(req,res,next){
    let new_teacher = {
        first_name : req.body.first_name,
        createdAt: new Date(),
        updatedAt: new Date(),
        last_name : req.body.last_name,
        email : req.body.email
    }
    Model.Teacher.findAll({where: {email:new_teacher.email}})
    .then((data)=>{
        if(data.length > 0){            
            req.alert = 'Please use different email';
            return next();
        }else{
            Model.Teacher.upsert(new_teacher)
            .then(()=>{
                req.alert = 'Success add new teacher';
                return next();
            })
            .catch(()=>{
                req.alert = 'Fail add new teacher';
                return next();
            });
        }        
    }).catch(()=>{
        req.alert = 'Fail add new teacher';
        return next();
    });  
   
}

function updateTeacher(req,res,next){
    let updated_teacher = {
        id:req.params.id,
        first_name : req.body.first_name,
        createdAt: new Date(),
        updatedAt: new Date(),
        last_name : req.body.last_name,
        email : req.body.email
    }
    Model.Teacher.findAll({where: [{email:updated_teacher.email},{id: { $notLike: updated_teacher.id}}]})
    .then(()=>{
        req.alert = 'Please use different email';
        return next();   
    }).catch(()=>{
        Model.Teacher.upsert(updated_teacher)
        .then(()=>{
            req.alert = 'Success edit teacher';
            return next();
        })
        .catch(()=>{
            req.alert = 'Fail edit teacher';
            return next();
        });
    });  
    
}

function deleteTeacher(req, res, next){
    let teacher_id = req.params.id;
    Model.Teacher.destroy({where :{id:teacher_id}})
    .then(()=>{
        req.alert = 'Success delete teacher';
        return next();
    })
    .catch(()=>{
        req.alert = 'Fail delete teacher';
        return next();
    });
}

// Subjects

function showSubjects(req, res){    
    Model.Subject.findAll({include: [{model:Model.Teacher}], order: [['id', 'ASC']]}, { raw: true })
    .then(subjectsData =>{
        //get alert value from add
        let alert;
        if(req.alert) alert = req.alert;
        //render
        //console.log('--------',subjectsData)
        res.render('subjects',{
            subjectsData : subjectsData,
            alert:alert
        });
    }); 
}

function addNewSubject(req, res, next){
    let new_subject = {
        subject_name : req.body.subject_name,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    Model.Subject.upsert(new_subject)
    .then(()=>{
        req.alert = 'Success add new subject';
        return next();
    })
    .catch(()=>{
        req.alert = 'Fail add new subject';
        return next();
    });
}

function updateSubject(req, res, next){
    let updated_subject = {
        id:req.params.id,
        subject_name : req.body.subject_name,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    Model.Subject.upsert(updated_subject)
    .then(()=>{
        req.alert = 'Success edit subject';
        return next();
    })
    .catch(()=>{
        req.alert = 'Fail edit subject';
        return next();
    });
}

function deleteSubject(req, res, next){
    let subject_id = req.params.id;
    Model.Subject.destroy({where :{id:subject_id}})
    .then(()=>{
        req.alert = 'Success delete teacher';
        return next();
    })
    .catch(()=>{
        req.alert = 'Fail delete teacher';
        return next();
    });
}

// Students

function showStudents(req, res){    
    Model.Student.findAll({order: [['id', 'ASC']]},{ raw: true })
    .then(studentsData =>{
        //get alert value from add
        let alert;
        if(req.alert) alert = req.alert;
        //render
        res.render('students',{
            studentsData : studentsData,
            alert:alert
        });
    }); 
}
function addNewStudent(req,res,next){
    let new_student = {
        first_name : req.body.first_name,
        createdAt: new Date(),
        updatedAt: new Date(),
        last_name : req.body.last_name,
        email : req.body.email
    }
    Model.Student.findAll({where: {email:new_student.email}})
    .then((data)=>{
        if(data.length > 0){            
            req.alert = 'Please use different email';
            return next();
        }else{
            Model.Student.upsert(new_student)
            .then(()=>{
                req.alert = 'Success add new student';
                return next();
            })
            .catch(()=>{
                req.alert = 'Fail add new student';
                return next();
            });
        }        
    }).catch(()=>{
        req.alert = 'Fail add new student';
        return next();
    });  
}
function showSubjectById(req, res){    
    Model.Subject.findById(req.params.id,{ raw: true })
    .then(subjectData =>{
        res.render('subject-edit',{
            subjectData : subjectData
        });
    }); 
}

function showStudentsById(req, res){    
    Model.Student.findById(req.params.id,{ raw: true })
    .then(studentData =>{
        res.render('student-edit',{
            studentData : studentData
        });
    }); 
}
function updateStudent(req,res,next){
    let updated_student = {
        id:req.params.id,
        first_name : req.body.first_name,
        createdAt: new Date(),
        updatedAt: new Date(),
        last_name : req.body.last_name,
        email : req.body.email
    }
    Model.Student.findAll({where: [{email:updated_student.email},{id: { $notLike: updated_student.id}}]})
    .then(()=>{
        req.alert = 'Please use different email';
        return next();   
    }).catch(()=>{
        Model.Student.upsert(updated_student)
        .then(()=>{
            req.alert = 'Success edit student';
            return next();
        })
        .catch(()=>{
            req.alert = 'Fail edit student';
            return next();
        });
    });    
}
function deleteStudent(req, res, next){
    let student_id = req.params.id;
    Model.Student.destroy({where :{id:student_id}})
    .then(()=>{
        req.alert = 'Success delete teacher';
        return next();
    })
    .catch(()=>{
        req.alert = 'Fail delete teacher';
        return next();
    });
}



app.get('/teachers', showTeachers);
app.get('/subjects', showSubjects);
app.get('/students', showStudents);
app.post('/teachers/add',addNewTeacher, showTeachers);
app.post('/subjects/add',addNewSubject, showSubjects);
app.post('/students/add',addNewStudent, showStudents);
app.get('/teachers/edit/:id', showTeacherById);
app.get('/subjects/edit/:id', showSubjectById);
app.get('/students/edit/:id', showStudentsById);
app.post('/teachers/edit/:id',updateTeacher, showTeachers);
app.post('/subjects/edit/:id',updateSubject, showSubjects);
app.post('/students/edit/:id',updateStudent, showStudents);
// app.get('/teachers/delete/:id', showTeachers);
// app.get('/subjects/delete/:id', showSubjects);
// app.get('/students/delete/:id', showStudents);
app.post('/teachers/delete/:id',deleteTeacher, showTeachers);
app.post('/subjects/delete/:id',deleteSubject, showSubjects);
app.post('/students/delete/:id',deleteStudent, showStudents);

app.listen(3000, ()=>{
    console.log('server started in port 3000')
});