'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const risk = [];
    const risk_type = [
      "A 1",
      "A 2",
      "A 3",
      "A 4",
      "B 1",
      "B 2",
      "B 3",
      "B 4",
      "C 1",
      "C 2",
      "C 3",
      "C 4",
      "D 1",
      "D 2",
      "D 3",
      "D 4"
    ];

    // Generate Type of controls based on the numberOfRows
    for (let i = 0; i < risk_type.length; i++) {
      risk.push({
        name: risk_type[i],
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // Bulk insert the generated fruits into the database
    await queryInterface.bulkInsert('risk_categories', risk, {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('risk_categories', null, {});
  }
};
