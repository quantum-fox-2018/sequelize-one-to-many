'use strict';

const sequelize = require('sequelize');
const Op = sequelize.Op

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
          let filter = {email:email}
          if(this.id != null){
            filter = {email:email, id : {[Op.ne]:this.id }}
          }
          Teacher.findOne({where: filter}).then(data=>{
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
