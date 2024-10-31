'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const types = [];
    const danger_types = [
      "Microbiological",
      "Physical",
      "Chemical",
      "Allergens"
    ];

    // Generate Type of controls based on the numberOfRows
    for (let i = 0; i < danger_types.length; i++) {
      types.push({
        name: danger_types[i],
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // Bulk insert the generated fruits into the database
    await queryInterface.bulkInsert('dangers', types, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('dangers', null, {});
  }
};
