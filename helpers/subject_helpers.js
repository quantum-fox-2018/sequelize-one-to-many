const db = require('../models')


function getAllSubject (cb){
  db.Subject.findAll()
  .then(function(listSubject){
    cb(listSubject)
  });
}
module.exports = {
                    getAllSubject
                  } ;
