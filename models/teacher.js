'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate:{
        isEmail: {
          args: true,
          //msg ga keluar
          msg: 'Format bukan email'
        },
        isEmailAvailable: function(value, msg){
          Teacher.findAll({where:{email:value}})
          .then(Results =>{
            if(Results.length != 0){
              msg(new Error('Email Sudah di pakai'));
              //kalo pake throw data tetep ke simpen
            }
          })
          .catch(err =>{
              msg(new Error('Email Sudah di pakai'));
          })
        }
      }
    },
    SubjectId: DataTypes.INTEGER
  }, {

  });
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject)
  };
  return Teacher;
};
