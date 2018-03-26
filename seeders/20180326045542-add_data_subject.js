'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Subjects', [{
      subject_name: 'Kimia',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      subject_name: 'Ekonomi',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      subject_name: 'Fisika',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
