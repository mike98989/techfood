'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const values = [];
    const remark_types = [
      "Big Bag - Gassing error",
      "Big Bag-Lock not on",
      "Big-Bag Broken filters",
      "Big Bag- Other (Comment)",
      "CCP- Closure",
      "CCP-Sight",
      "CCP-Metal detector",
      "CCP Metal detector",
      "CIP Disk",
      "Routine/instruction not followed",
      "Packaging-Decor error",
      "Packaging - Misdelivery",
      "Packaging-Damaged packaging",
      "Error in instruction",
      "Error in routine",
      "Fault in production equipment",
      "Mismixed",
      "Deficient cleaning",
      "Lack of order and order",
      "Different texture",
      "Moldy/Yeast/Horrible",
      "Foreign objects",
      "Wood",
      "Plastic",
      "Metal",
      "Paper",
      "Rubber",
      "Packaging plastic",
      "Hair",
      "Difficult to prepare",
      "Damaged use, no glass in product",
      "Damaged use, glass in product",
      "Undamaged use, glass in product",
      "Conical piece of glass from the bottom",
      "Glass piece, Not glass packaging",
      "Raw material residue",
      "Damaged animals",
      "Broken/damaged packaging",
      "Wrong label",
      "Wrongly packed",
      "No visible best before date",
      "Wrong product quantity in packaging",
      "Hard-to-open packaging",
      "Contaminated product",
      "Different appearance",
      "Burnt particles"
    ];

    // Generate Type of controls based on the numberOfRows
    for (let i = 0; i < remark_types.length; i++) {
      values.push({
        name: remark_types[i],
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // Bulk insert the generated fruits into the database
    await queryInterface.bulkInsert('type_of_remarks', values, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('type_of_remarks', null, {});
  }
};
