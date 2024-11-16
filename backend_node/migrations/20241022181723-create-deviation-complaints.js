'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('deviation_complaints', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'users', // Name of the target table
          key: 'id', // Key in the target table
        },
      },
      reference_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      occurance_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deviation_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deviation_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      product: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      risk_category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      article_no: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      batch_no: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      section: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deviation_description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      suggested_correction: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      submitter: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('deviation_complaints');
  }
};