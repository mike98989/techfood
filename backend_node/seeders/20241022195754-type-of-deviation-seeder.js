'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const types = [];
    const control_types = [
      "Fire Protection",
      "Eco/KRAV",
      "Hygiene Round",
      "Customer Audit",
      "Quality",
      "Quality Audit - External FSSC",
      "Quality Audit - External ISO 9001",
      "Quality Audit - Internal",
      "Environment",
      "Environmental Audit - External ISO 14000",
      "Environmental Audit - Internal",
      "Energy Audit - External"
    ];

    // Generate Type of controls based on the numberOfRows
    for (let i = 0; i < control_types.length; i++) {
      types.push({
        name: control_types[i],
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // Bulk insert the generated fruits into the database
    await queryInterface.bulkInsert('type_of_deviations', types, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('type_of_deviations', null, {});
  }
};
