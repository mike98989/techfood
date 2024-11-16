'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fruits = [];
    const fruit_options = [
      "Orange",
      "Banana",
      "Apple",
      "Strawberry",
      "Cherries",
      "Avocado",
      "Watermelon",
      "Grape",
    ];

    // Generate fruits based on the numberOfRows
    for (let i = 0; i < fruit_options.length; i++) {
      fruits.push({
        name: fruit_options[i],
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // Bulk insert the generated fruits into the database
    await queryInterface.bulkInsert('fruits', fruits, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Optional: Remove all rows from the 'fruits' table
    await queryInterface.bulkDelete('fruits', null, {});
  }
};
