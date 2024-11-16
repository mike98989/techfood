'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const types = [];
    const product_types = [
      "BMP-Buttermilk",
      "Bread mix",
      "Porridge",
      "Crispbread",
      "MME",
      "Scrubbing fluid",
      "Spray grease",
      "Spray foamed milk",
      "Waltz Cereals",
      "Whey",
      "Whey milk",
      "WPC",
      "Gruel",
      "Gourd-Requirements",
      "Other"
    ];

    // Generate Type of controls based on the numberOfRows
    for (let i = 0; i < product_types.length; i++) {
      types.push({
        name: product_types[i],
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // Bulk insert the generated fruits into the database
    await queryInterface.bulkInsert('type_of_products', types, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('type_of_products', null, {});
  }
};
