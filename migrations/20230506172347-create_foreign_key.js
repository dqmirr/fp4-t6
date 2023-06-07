'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addConstraint("Photos", {
      fields: ["UserId"],
      type: "foreign key",
      name: "userId_fk",
      references: {
        table: "Users",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    })

    await queryInterface.addConstraint("SocialMedia", {
      fields: ["UserId"],
      type: "foreign key",
      name: "userID_fk",
      references: {
        table: "Users",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    })

    await queryInterface.addConstraint("Comments", {
      fields: ["UserId"],
      type: "foreign key",
      name: "user_ID_fk",
      references: {
        table: "Users",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    })

    await queryInterface.addConstraint("Comments", {
      fields: ["PhotoId"],
      type: "foreign key",
      name: "photoID_fk",
      references: {
        table: "Photos",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
