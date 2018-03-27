'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Teachers',
      'last_name',
      {
        type: Sequelize.STRING
      })
      .then(()=>{
        return queryInterface.addColumn(
          'Teachers',
          'email',
          {
            type: Sequelize.STRING
          })
      });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
