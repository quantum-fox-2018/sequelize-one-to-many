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

      }
    }
  }, {
    indexes: [{
      unique: true,
      fields: ['email']
    }],
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