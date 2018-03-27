'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: 
    {
      type: DataTypes.STRING,
      validate: {
        isEmail: {args: true, msg: 'email-invalid'}
      }
    },
    subject_id: DataTypes.STRING
  }, {});
  Teacher.associate = function(models) {
    Teacher.belongsTo(models.Subject, {foreignKey: 'subject_id'});
  };
  return Teacher;
};