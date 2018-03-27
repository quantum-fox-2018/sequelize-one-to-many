'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    SubjectId: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail:{
          args: true,
          msg: "email salah"
        },
        isUniqueEmail: function(email, callback){
          Teacher.findOne({where: {email:email}}).then(data=>{
            if(data) {
              callback('email sudah ada')
            } else {
              callback()
            }
          })
        }
      }
    }
  }, {});
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject)
  };

  return Teacher;
};
