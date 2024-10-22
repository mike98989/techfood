'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const types = [];
    const types_options = [
      "Physical",
      "Microbiological",
      "Allergens",
      "Chemical"
    ];

    // Generate fruits based on the numberOfRows
    for (let i = 0; i < types_options.length; i++) {
      types.push({
        type: types_options[i],
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert('fruit_production_deviation_types', types, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
