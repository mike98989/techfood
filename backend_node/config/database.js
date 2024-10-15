const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    "techfood",
    "root",
    "root",
    {
        host: process.env.DB_HOST || 'mysql_host',
        dialect: 'mysql',
        port: 3306
    }
);

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Error connecting to the database:', err));


module.exports = sequelize;
