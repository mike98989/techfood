const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path to your database configuration
//const User = require('./User'); // Import the Post model

class FruitProduction extends Model { }

// Initialize the User model
FruitProduction.init({
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
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    section: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cause: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deviation_type: {
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
    modelName: 'FruitProduction',
    tableName: 'fruit_productions', // Specify the exact table name in the database
    timestamps: false, // Set to false because we're using existing timestamp columns
});


// Export the model
module.exports = FruitProduction;
