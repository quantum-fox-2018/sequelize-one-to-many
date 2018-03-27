'use strict';
// var Sequelize = require('sequelize');
// const Op = Sequelize.Op;

module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate:{
        isEmail: {
          args: true,
          msg: 'format email salah'
        },
        isEmailAvailable: function(value, msg){
          // console.log('===========================');
          // console.log(this.id);
          //$notLike /$ne ===> kalo g pake Op Sequelize
          let where = {email:value};
          if(this.id !== null){
            where = {email:value, id: {$ne: this.id}};
          }
          Teacher.findAll({where})
          .then(Results =>{
            if(Results.length != 0){

              msg(new Error('Email Sudah di pakai'));
              //kalo pake throw data tetep ke simpen
            }else{
              msg()
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
    hooks:{
      beforeCreate: (instance, options) =>{
        console.log('Sebelum di buat / insert');
      },
      afterCreate: (instance, options) =>{
        console.log('Data Teacher Sudah di buat');
      }
    }
  });
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject)
  };
  return Teacher;
};
