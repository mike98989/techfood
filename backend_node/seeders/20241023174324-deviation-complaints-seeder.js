'use strict';

/** @type {import('sequelize-cli').Migration} */
const { faker } = require('@faker-js/faker');

// Function to get a random value from an array
function getRandomValueFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const title_example = [
  "Wrong Packaging",
  "Incorrect Labeling",
  "Broken Seal",
  "Damaged Product",
  "Product Contamination",
  "Foreign Object in Product",
  "Incomplete Delivery",
  "Wrong Item Delivered",
  "Production Equipment Failure",
  "Missing Documentation",
  "Quality Check Failure",
  "Exceeded Safety Limits",
  "Delayed Shipment",
  "Wrong Batch Number",
  "Misaligned Printing",
  "Expired Product",
  "Incorrect Product Weight",
  "Damaged Packaging",
  "Insufficient Stock",
  "Inconsistent Product Quality",
  "Temperature Control Failure",
  "Product Recall",
  "Allergen Contamination",
  "Improper Storage Conditions",
  "Product Spillage",
  "Incorrect Instructions",
  "Supply Chain Disruption",
  "Unapproved Supplier",
  "Cross Contamination",
  "Inadequate Cleaning Procedures",
  "Unmet Safety Standards",
  "Improper Documentation",
  "Improper Handling of Product",
  "Unauthorized Access to Product",
  "Packaging Misprint",
  "Mismatched Barcodes",
  "Incorrect Product Placement",
  "Product Damage During Shipping",
  "Improper Disposal of Waste",
  "Recycling Failure",
  "Failure in Product Testing",
  "Excessive Product Waste",
  "System Error in Production",
  "Unsafe Working Conditions",
  "Failure in CCP Monitoring",
  "Failure in Supplier Audit",
  "Deviations in Product Composition",
  "Labeling Non-compliance",
  "Inaccurate Sales Forecasting",
  "Incorrect Product Temperature"
];

module.exports = {
  async up(queryInterface, Sequelize) {

    const deviation_complaints = [];
    const deviation_type = await queryInterface.sequelize.query(
      'SELECT name FROM type_of_deviations',
      { type: Sequelize.QueryTypes.SELECT }
    );
    const type_of_remark = await queryInterface.sequelize.query(
      'SELECT name FROM type_of_remarks',
      { type: Sequelize.QueryTypes.SELECT }
    );
    const type_of_products = await queryInterface.sequelize.query(
      'SELECT name FROM type_of_products',
      { type: Sequelize.QueryTypes.SELECT }
    );
    const sections = await queryInterface.sequelize.query(
      'SELECT name FROM deviation_sections',
      { type: Sequelize.QueryTypes.SELECT }
    );
    const lines = await queryInterface.sequelize.query(
      'SELECT name FROM 	type_of_lines',
      { type: Sequelize.QueryTypes.SELECT }
    );
    // Define the number of rows you want to insert
    const numberOfRows = 50;

    // Generate fruitProductions based on the numberOfRows
    for (let i = 0; i < numberOfRows; i++) {
      const randomDeviationType = deviation_type[Math.floor(Math.random() * deviation_type.length)]; // Pick a random deviation type
      const randomRemark = type_of_remark[Math.floor(Math.random() * type_of_remark.length)]; // Pick a random deviation type
      const product = type_of_products[Math.floor(Math.random() * type_of_products.length)]; // Pick a random products type
      const section = sections[Math.floor(Math.random() * sections.length)]; // Pick a random section
      const line = lines[Math.floor(Math.random() * lines.length)]; // Pick a random section

      deviation_complaints.push({
        user_id: '1',
        reference_number: "AV-" + Math.floor(Math.random() * (7000 - 6000)) + '/' + faker.date.past(1).getFullYear(),
        title: getRandomValueFromArray(title_example),
        occurance_date: faker.date.past(2),
        deviation_type: randomDeviationType.name,
        deviation_code: randomRemark.name,
        product: product.name,
        article_no: Math.floor(Math.random() * (8000 - 6000)) + 8000,
        batch_no: faker.date.past(1).getFullYear().toString().slice(-2) + Math.floor(Math.random() * (8000 - 6000)) + 8000,
        location: section.name,
        line: line.name,
        submitter: faker.name.firstName(),
        status: Math.floor(Math.random() * 2) + 1,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    // Bulk insert the generated deviation_complaints into the database
    await queryInterface.bulkInsert('deviation_complaints', deviation_complaints, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('deviation_complaints', null, {});
  }
};
