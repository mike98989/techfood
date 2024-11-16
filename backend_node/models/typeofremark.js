'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

//module.exports = (sequelize, DataTypes) => {
class TypeOfRemark extends Model { }
TypeOfRemark.init({
  name: DataTypes.STRING
}, {
  sequelize,
  modelName: 'TypeOfRemark',
  tableName: 'type_of_remarks', // Specify the exact table name in the database
  timestamps: false, // Set to false because we're using existing timestamp columns
});


module.exports = TypeOfRemark;
//return TypeOfRemark;
//};