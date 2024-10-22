const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path to your database configuration

class LabInputs extends Model { }

// Initialize the User model
LabInputs.init({
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
    PO_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    batch_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    protein_value: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    lactose_value: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    water_value: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    result_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        field: 'created_at', // Maps to the existing column name
        allowNull: false,
    },
    updated_at: {
        type: DataTypes.DATE,
        field: 'updated_at', // Maps to the existing column name
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'LabInputs',
    tableName: 'lab_inputs', // Specify the exact table name in the database
    timestamps: false, // Set to false because we're using existing timestamp columns
});

// Export the model
module.exports = LabInputs;
