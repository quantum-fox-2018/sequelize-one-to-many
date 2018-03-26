'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'email format is incorrect'
        },
        isUnique: function(value, next){
          Teacher.findOne({
            where: {
              email: value
            }
          })
          .then(result => {
            if(result == null){
              return next()
            }
            else{
              return next ('Email Tidak Boleh duplikat')
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
  Teacher.getSubjectName = function(options) {
    return new Promise((resolve, reject) => {
      Teacher.findAll({
        order: [['id','ASC']]
      })
      .then(dataTeacher => {
        let TeacherSubj = dataTeacher.map(Teacher_Subj => {
          return new Promise((resolve, reject) => {
            Teacher_Subj.getSubject()
            .then(subject => {
              Teacher_Subj.Subject = subject
              resolve(Teacher_Subj)
            })
            .catch(err => {
              reject(err)
            })
          });
        })

        Promise.all(TeacherSubj)
        .then(newTeacher => {
          resolve(newTeacher)
        })
        .catch(err => {
          reject(err)
        })

      })
    });
  };

  return Teacher;
};