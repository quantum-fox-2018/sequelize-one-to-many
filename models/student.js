'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: false,
          msg: 'email format is incorrect!'
        },
        isUnique: function(value, msg) {
          let where = {email: value}
          if (this.id !== null) {
            where = {
              email: value,
              id: {$ne: this.id}
            }
          }
          Student.findAll({where: where})
          .then(results => {
            if (results.length > 0) {
              msg(new Error('email already taken!'));
            }
            msg();
          })
        }
      }
    }
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
  };
  return Student;
};
