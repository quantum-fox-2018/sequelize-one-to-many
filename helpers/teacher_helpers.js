const db = require('../models')

function getTeachersJoinSubject (cb) {
  db.Teacher.findAll({
    order:[
      ['id', 'ASC']
    ],
    include: [{// Notice `include` takes an ARRAY
      model: db.Subject,
      as: 'Subject'
    }]
  })
  .then(data_teacher => {
    cb(data_teacher)
  })
}

function getAllTeacher (cb){
  db.Teacher.findAll()
  .then(function(listTeacher){
    cb(listTeacher)
  });
}
module.exports = {
                    getTeachersJoinSubject,
                    getAllTeacher
                  } ;
