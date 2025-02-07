"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const today = new Date();
    await queryInterface.bulkInsert(
      "Transaction_types",
      [
        {
          name: "TOPUP",
          created_at: today,
          updated_at: today,
        },
        {
          name: "PAYMENT",
          created_at: today,
          updated_at: today,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Transaction_types", null, {});
  },
};
