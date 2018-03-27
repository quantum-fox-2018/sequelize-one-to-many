'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Teachers', 
    [
      {
        first_name: 'Bambang',
        createdAt: new Date(),
        updatedAt: new Date(),
        last_name: 'Suprapto',
        email:'bambangsuprapto@sekolah.id'
      },
      {
        first_name: 'Rukmana',
        createdAt: new Date(),
        updatedAt: new Date(),
        last_name: 'Fatmawati',
        email:'rukmanafatmawati@sekolah.id'
      },
      {
        first_name: 'Butet',
        createdAt: new Date(),
        updatedAt: new Date(),
        last_name: 'Naiborhu',
        email:'butetnaiborhu@sekolah.id'
      },
      {
        first_name: 'Yulius',
        createdAt: new Date(),
        updatedAt: new Date(),
        last_name: 'Prawinegara',
        email:'yuliusprawinegara@sekolah.id'
      }
    ], {});
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
