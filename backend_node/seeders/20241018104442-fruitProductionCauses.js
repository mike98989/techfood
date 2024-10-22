'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const causes = [];
    const cause_options = [
      "Tidiness and cleaning",
      "Maintenance",
      "Order and order",
      "Pest",
      "Food hygiene"
    ];

    // Generate fruits based on the numberOfRows
    for (let i = 0; i < cause_options.length; i++) {
      causes.push({
        cause: cause_options[i],
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert('fruits_production_causes', causes, {});
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
