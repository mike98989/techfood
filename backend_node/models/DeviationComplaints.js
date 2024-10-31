const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path to your database configuration

class DeviationComplaints extends Model { }

// Initialize the User model
DeviationComplaints.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: { // This is the foreign key referencing the User model
    type: DataTypes.INTEGER,
    allowNull: false, // Ensure the userId cannot be null
    references: {
      model: 'User', // Name of the target table
      key: 'id', // Key in the target table
    },
  },
  reference_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  occurance_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  submitter: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deviation_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deviation_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  article_no: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  batch_no: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  line: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    field: 'updated_at', // Maps to the existing column name
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'DeviationComplaints',
  tableName: 'deviation_complaints', // Specify the exact table name in the database
  timestamps: false, // Set to false because we're using existing timestamp columns
});

// Export the model
module.exports = DeviationComplaints;
