const models = require('../models');

function getSubjects(callback) {
  models.Subject.findAll({
    order: [['id', 'ASC']]
  })
  .then(subjects => {
    // console.log(subjects[0].dataValues);
    callback(subjects)
  })
}

// getSubjects();

module.exports = getSubjects;
