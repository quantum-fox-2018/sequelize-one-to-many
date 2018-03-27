'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    SubjectId: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'email format is incorrect'
        },
        isUnique(value, callback){
          let where = {email:value};
          if(this.id != null){
            where = {email:value, id:{$ne: this.id}}
          }
          Teacher.findOne({where})
          .then(function(errorMessage, dataTeacher){
            if(dataTeacher == null){
              callback();
            }else if(dataTeacher.length != 0){
              callback('Email must be unique!');
            } 
          })
        }
      },
    }
  }, {
    hooks: {
      beforeValidate: function(Teacher, options){
        console.log('VALIDATION START!');
        
      },
      afterValidate: function(Teacher, options){
        console.log('VALIDATION ENDED');
      }
    }
  });
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject)
  };
  return Teacher;
};