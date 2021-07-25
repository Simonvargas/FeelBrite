'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        id:1,
        type: 'Cycling',
      },
      
      {
        id: 2,
        type: 'Yoga',
      },
      
      {
      id: 3,
      type: 'Crossfit',
      },
      
      {
      id: 4,
      type: 'Outdoors',
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('Categories', null, {});
  }
};
