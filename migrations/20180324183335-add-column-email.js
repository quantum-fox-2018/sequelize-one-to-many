'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('Teachers', 'email', {type: Sequelize.STRING})

  },

  down: (queryInterface, Sequelize) => {
    
  }
};
