'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    subjectId: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'email format is incorrect'
        },
        // isUnique: function(value, cb){
        //   Teacher.findOne(where:{email: value})
        //   .then(function(data){
        //     cb('Email already in use!')
        //   })
        //
        // }
        isUnique: function(value, next){
          Teacher.find({
            where:{email: value},
            attributes: ['id']
          })
          .then(function(user, error){
            if( error || user )
              return next('Email already in use!');
              next();
          })
        }
      }
    }
  }, {
    // hooks: {
    //   beforeUpdate: (teacher, option) => {
    //     user.email="updat@dong.com";
    //     console.log(user.email);
    //   },
    //   afterUpdate: (teacher, option) => {
    //     console.log("------------ udah update");
    //   }
    // }
  });

  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject, {
      foreignKey: 'subjectId'
    })

  };

  Teacher.hook('beforeUpdate', (user, options) => {
     let test = user.email
    console.log(test);
  });

  return Teacher;
};
