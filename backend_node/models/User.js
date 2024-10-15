const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path to your database configuration

class User extends Model {
    // Static method to find a user by email
    static async findUserByEmail(email) {
        try {
            // Search for a user with the specified email
            return await User.findOne({ where: { email } });
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw error;
        }
    }
}

// Initialize the User model
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
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
    modelName: 'User',
    tableName: 'users', // Specify the exact table name in the database
    timestamps: false, // Set to false because we're using existing timestamp columns
});

// Export the model
module.exports = User;
