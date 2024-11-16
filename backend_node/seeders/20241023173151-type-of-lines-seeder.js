'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const types = [];
    const line_types = [
      "The packaging warehouse",
      "The finished goods warehouse",
      "The raw material warehouse",
      "L52",
      "L53",
      "L54",
      "L55",
      "L56",
      "L57",
      "L58",
      "L59",
      "L62",
      "L70",
      "L71",
      "L73",
      "L81 (Rovema 1)",
      "L83 (Rovema 3)",
      "L84 (Hermic)",
      "L89 (Rovema 4)",
      "L90 Can line",
      "Other (Please specify)",
      "Tower 1",
      "Tower 3",
      "Tower 4",
      "The ultrafiltration",
      "Waltz 6",
      "Waltz 7/8",
      "Tank hall",
      "Other (Please specify)"
    ]

    // Generate Type of controls based on the numberOfRows
    for (let i = 0; i < line_types.length; i++) {
      types.push({
        name: line_types[i],
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // Bulk insert the generated fruits into the database
    await queryInterface.bulkInsert('type_of_lines', types, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('type_of_lines', null, {});
  }
};
