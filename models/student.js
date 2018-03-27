'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Input must be email!'
        }
      }
    }
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
  };
  return Student;
};