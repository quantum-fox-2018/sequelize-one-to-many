'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn(
        'Teachers',
        'gender',
        Sequelize.STRING
      ),
      queryInterface.addColumn(
        'Teachers',
        'name_prefix',
        Sequelize.STRING
      )
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn(
        'Teachers',
        'gender'
      ),
      queryInterface.removeColumn(
        'Teachers',
        'name_prefix'
      )
    ]
  }
};
