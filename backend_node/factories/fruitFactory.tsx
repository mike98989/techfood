import { now } from "sequelize/lib/utils";

const { Fruit } = require("../models"); // Adjust the path based on your structure
const faker = require("faker");

// Array of options
const fruit_options = [
  "Orange",
  "Banana",
  "Apple",
  "Strawberry",
  "Cherries",
  "Avocado",
  "Watermelon",
  "Grape",
];

// Function to get a random value from an array
function getRandomValueFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const createFruit = async (overrides = {}) => {
  const fruit = {
    name: getRandomValueFromArray(fruit_options),
    created_at: new Date(),
    updated_at: new Date(),
    ...overrides,
  };

  return Fruit.create(fruit);
};

module.exports = {
  createFruit,
};
