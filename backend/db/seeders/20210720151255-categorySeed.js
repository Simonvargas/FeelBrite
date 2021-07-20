'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        type: 'Cycling',
      },
      
      {
        type: 'Yoga',
      },
      
      {
      type: 'Crossfit',
      },
      
      {
      type: 'Outdoors',
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('Categories', null, {});
  }
};
