'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {type: DataTypes.STRING, 
      validate: {
        isEmail: {
          arg: true,
          msg: `email not valid`
        }
      }},
    subjectId: DataTypes.INTEGER
  }, {});
  Teacher.associate = function (models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject, {
      foreignKey: 'subjectId'
    })
  };
  return Teacher;
};