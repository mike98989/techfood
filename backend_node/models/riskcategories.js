'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class RiskCategories extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
RiskCategories.init({
  name: DataTypes.STRING
}, {
  sequelize,
  modelName: 'RiskCategories',
  tableName: 'risk_categories', // Specify the exact table name in the database
  timestamps: false, // Set to false because we're using existing timestamp columns
});
module.exports = RiskCategories;
