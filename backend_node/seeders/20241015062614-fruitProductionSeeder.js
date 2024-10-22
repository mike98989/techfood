'use strict';

// Function to get a random value from an array
function getRandomValueFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
// Array of options
const cause_options = [
  "Maintenance",
  "Tidiness and cleaning",
  "Order and order",
  "Pest",
  "Food hygiene",
];
const deviation_type_options = [
  "Physical",
  "Microbiological",
  "Allergens",
  "Chemical",
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fruitProductions = [];
    const fruits = await queryInterface.sequelize.query(
      'SELECT name FROM fruits', /// Select fruit from fruits table
      { type: Sequelize.QueryTypes.SELECT }
    );
    // Define the number of rows you want to insert
    const numberOfRows = 50;

    // Generate fruitProductions based on the numberOfRows
    for (let i = 0; i < numberOfRows; i++) {
      const randomFruit = fruits[Math.floor(Math.random() * fruits.length)]; // Pick a random user
      const today = new Date();
      fruitProductions.push({
        user_id: '1',
        date: new Date(new Date('2024-01-01T01:57:45.271Z').getTime() + Math.random() * (new Date().getTime() - new Date('2024-05-12T01:57:45.271Z').getTime())),
        section: randomFruit.name,
        status: Math.floor(Math.random() * 2) + 1,
        cause: getRandomValueFromArray(cause_options),
        deviation_type: getRandomValueFromArray(deviation_type_options),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }


    // Bulk insert the generated fruit_productions into the database
    await queryInterface.bulkInsert('fruit_productions', fruitProductions, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Optional: Remove all rows from the 'fruit_productions' table
    await queryInterface.bulkDelete('fruit_productions', null, {});
  }
};
