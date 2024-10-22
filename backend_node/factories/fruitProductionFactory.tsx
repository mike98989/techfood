import { now } from "sequelize/lib/utils";

const Fruit = require("../models/Fruit");
const FruitProduction = require("../models/FruitProduction");

const faker = require("faker");

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

// Function to get a random value from an array
function getRandomValueFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const createFruitProduction = async (overrides = {}) => {
  const categories = await Fruit.findAll();

  const fruit = {
    date: faker.date.between("2024-01-01", now),
    section: faker.internet.email(),
    status: Math.floor(Math.random() * 2) + 1,
    cause: getRandomValueFromArray(cause_options),
    deviation_type: getRandomValueFromArray(deviation_type_options),
    created_at: new Date(),
    updated_at: new Date(),
    ...overrides,
  };

  return FruitProduction.create(fruit);
};

module.exports = {
  createFruitProduction,
};
