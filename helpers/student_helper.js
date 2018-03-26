const cStudent = require('../controllers/ControllerStudent.js');

listStudent = (callback) => {
  cStudent.list()
  .then((students) => {
    callback(students);
  })
  .catch(err => {
    console.log(err.message);
  });
}

module.exports = {
  listStudent
};
