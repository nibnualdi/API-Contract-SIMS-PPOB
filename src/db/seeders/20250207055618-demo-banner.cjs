"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const today = new Date();
    return queryInterface.bulkInsert("Banners", [
      {
        banner_name: "Banner 1",
        banner_image:
          "https://images.squarespace-cdn.com/content/v1/56acc1138a65e2a286012c54/1476623632079-BBAERA9UGQ0EODC6680U/pixabaytest6-7.jpg?format=1000w",
        description: "Lerem Ipsum Dolor sit amet",
        created_at: today,
        updated_at: today,
      },
      {
        banner_name: "Banner 2",
        banner_image:
          "https://images.squarespace-cdn.com/content/v1/56acc1138a65e2a286012c54/1476623632079-BBAERA9UGQ0EODC6680U/pixabaytest6-7.jpg?format=1000w",
        description: "Lerem Ipsum Dolor sit amet",
        created_at: today,
        updated_at: today,
      },
      {
        banner_name: "Banner 3",
        banner_image:
          "https://images.squarespace-cdn.com/content/v1/56acc1138a65e2a286012c54/1476623632079-BBAERA9UGQ0EODC6680U/pixabaytest6-7.jpg?format=1000w",
        description: "Lerem Ipsum Dolor sit amet",
        created_at: today,
        updated_at: today,
      },
      {
        banner_name: "Banner 4",
        banner_image:
          "https://images.squarespace-cdn.com/content/v1/56acc1138a65e2a286012c54/1476623632079-BBAERA9UGQ0EODC6680U/pixabaytest6-7.jpg?format=1000w",
        description: "Lerem Ipsum Dolor sit amet",
        created_at: today,
        updated_at: today,
      },
      {
        banner_name: "Banner 5",
        banner_image:
          "https://images.squarespace-cdn.com/content/v1/56acc1138a65e2a286012c54/1476623632079-BBAERA9UGQ0EODC6680U/pixabaytest6-7.jpg?format=1000w",
        description: "Lerem Ipsum Dolor sit amet",
        created_at: today,
        updated_at: today,
      },
      {
        banner_name: "Banner 6",
        banner_image:
          "https://images.squarespace-cdn.com/content/v1/56acc1138a65e2a286012c54/1476623632079-BBAERA9UGQ0EODC6680U/pixabaytest6-7.jpg?format=1000w",
        description: "Lerem Ipsum Dolor sit amet",
        created_at: today,
        updated_at: today,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Banners", null, {});
  },
};
