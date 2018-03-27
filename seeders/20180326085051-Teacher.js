'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Teachers', [{
      firstname: 'Yoko',
      lastname: 'Suyoko',
      email:'pendekarRajawali@burung.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstname: 'Sinto',
      lastname: 'Gendeng',
      email:'silatLokal@duasatudua.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstname: 'Padhalsim',
      lastname: 'Budhalsim',
      email:'silatJalanan@jalan.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstname: 'Chuck',
      lastname: 'Noris',
      email:'takterkalahkan@jurus.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstname: 'Saur',
      lastname: 'Sepuh',
      email:'ahliKeris@sakti.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
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
