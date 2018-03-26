'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    firstName: {
      type: DataTypes.STRING,
      validate:{
        len: {
          args: 3,
          msg: "Name must be atleast 3 characters in length"
        }
      }
    },
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate:{
        isEmail: {
          args: true,
          msg: "email format tidak tepat !"
        }
      }
    },
    SubjectId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (user, option)=>{
        user.firstName = "Mr / Mrs " + user.firstName
      }
    }
  });
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject)
  };

  return Teacher;
};
