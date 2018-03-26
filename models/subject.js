'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  }, {});
  Subject.associate = function(models) {
    // associations can be defined here
    Subject.hasMany(models.Teacher)
  };

  Subject.findAllWithTeacher = function(){
    return new Promise(function(resolve, reject){
      Subject.findAll().then(dataSubject => {
        // resolve(dataSubject)
        let promiseSubject = dataSubject.map(dataSubject => {
          
          return new Promise(function(resolve, reject){
            dataSubject.getTeachers()
            .then(teacher => {
              dataSubject.teacher = teacher
              resolve(dataSubject)
            })
            .catch(err => {
              reject(err)
            })
          })

        })

        Promise.all(promiseSubject)
        .then(newData => {
          resolve(newData)
        })
        .catch(err => {
          reject(err)
        })

      })
    })
  }

  return Subject;
};