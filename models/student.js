'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: () => {
        console.log("Belum masuk ke DB");
      },
      afterCreate: () => {
        console.log("Sudah masuk ke DB");
      }
    }
  });
  Student.associate = function(models) {
    // associations can be defined here
  };
  return Student;
};
