const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path to your database configuration

class Fruit extends Model { }

// Initialize the User model
Fruit.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
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
    modelName: 'Fruit',
    tableName: 'fruits', // Specify the exact table name in the database
    timestamps: false, // Set to false because we're using existing timestamp columns
});

// Export the model
module.exports = Fruit;
