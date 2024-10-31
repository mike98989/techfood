'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Dangers extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
Dangers.init({
  name: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Dangers',
  tableName: 'dangers', // Specify the exact table name in the database
  timestamps: false, // Set to false because we're using existing timestamp columns

});
module.exports = Dangers;