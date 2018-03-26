'use strict';
const {Subject} = require('./index')
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email format is incorrect !'
        },
        emailUnique(value, next){
          Teacher.findOne({
            where: {email: value}
          })
          .then(row => {
            if(row == undefined){
              next()
            } else {
              next('Email sudah terdaftar')
            }
          })
        }
      }
    },
    SubjectId: DataTypes.INTEGER
  }, {});
  
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject)
  };

  Teacher.findAllWithSubject = function(){
    return new Promise(function(resolve, reject){
      Teacher.findAll().then(teacherdata => {
        let promiseTeacher = teacherdata.map(teacherdata => {
          
          return new Promise(function(resolve, reject){
            teacherdata.getSubject()
            .then(subject => {
              teacherdata.subject = subject
              resolve(teacherdata)
            })
            .catch(err => {
              reject(err)
            })
          })
        })

        Promise.all(promiseTeacher)
        .then(newDataTeacher => {
          resolve(newDataTeacher)
        })
        .catch(err => {
          reject(err)
        })

      })
    })
    
  }
  
  
  return Teacher;
};