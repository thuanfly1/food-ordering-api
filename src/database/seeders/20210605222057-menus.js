module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Menus",
      [
        {
          name: "Bữa sáng",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bữa trưa/Bữa tối",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Đồ uống",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Menus", null, {});
  },
};
