'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
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
          Teacher.findAll({where: where})
          .then(results => {
            if (results.length > 0) {
              msg(new Error('email already taken!'));
            }
            msg();
          })
        }
      }
    },
    SubjectId: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    name_prefix: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, option) => {
        console.log('=======================');
        console.log('Before inserted to DB');
        console.log('=======================');
        if (user.gender == 'Male') {
          user.name_prefix = 'Mr. ';
        } else if (user.gender == 'Female') {
          user.name_prefix = 'Mrs./Ms. ';
        }
      },
      afterCreate: () => {
        console.log('=======================');
        console.log('After inserted to DB');
        console.log('=======================');
      },
      beforeBulkUpdate: (user, option) => {
        console.log('=======================');
        console.log('Before updated to DB');
        console.log('=======================');
        if (user.attributes.gender == 'Male') {
          user.attributes.name_prefix = 'Mr. ';
        } else if (user.attributes.gender == 'Female') {
          user.attributes.name_prefix = 'Mrs./Ms. ';
        }
      },
      afterBulkUpdate: () => {
        console.log('=======================');
        console.log('After Updated to DB');
        console.log('=======================');
      }
    }
  });
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject);
  };
  return Teacher;
};
