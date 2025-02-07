'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Services', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      service_code: {
        allowNull: false,
        type: Sequelize.STRING
      },
      service_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      service_icon: {
        allowNull: false,
        type: Sequelize.STRING
      },
      service_tariff: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Services');
  }
};