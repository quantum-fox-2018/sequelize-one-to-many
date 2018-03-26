'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail(value,next){
          let atPosition = value.indexOf('@')
          let dotPosition = value.indexOf('.')
          if(atPosition>=1 && dotPosition>=atPosition+1 && dotPosition<=value.length-2){
            next()
          } else {
            next('Format email salah')
          }
        },
        isUnique(value,next){
          Teacher.findOne({raw:true,
            where: {
              email: value
            }
          }).then(Teacher=>{
            if(Teacher==undefined){
              next()
            } else {
              next('Email sudah ada di database')
            }
          }).catch(err=>{
            console.log(err)
          })
        }
      }
    },
    SubjectId: DataTypes.INTEGER
  }, {});

  Teacher.associate = function(models) {
    Teacher.belongsTo(models.Subject)
  };
  return Teacher;
};
