'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const section = [];
    const section_type = [
      "LAB",
      "The warehouse",
      "Dry Side",
      "Wet side",
      "Workshop",
      "Out",
      "Miscellaneous"
    ];

    // Generate Type of controls based on the numberOfRows
    for (let i = 0; i < section_type.length; i++) {
      section.push({
        name: section_type[i],
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // Bulk insert the generated fruits into the database
    await queryInterface.bulkInsert('deviation_sections', section, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('deviation_sections', null, {});
  }
};
