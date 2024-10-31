'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
//module.exports = (sequelize, DataTypes) => {
class DeviationComplaintDeviationTypes extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
DeviationComplaintDeviationTypes.init({
  name: DataTypes.STRING
}, {
  sequelize,
  modelName: 'DeviationComplaintDeviationTypes',
  tableName: 'type_of_deviations', // Specify the exact table name in the database
  timestamps: false, // Set to false because we're using existing timestamp columns
});
//return DeviationComplaintDeviationTypes;
module.exports = DeviationComplaintDeviationTypes;
//};