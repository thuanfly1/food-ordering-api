module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Items",
      [
        {
          menuId: 1,
          name: "French Omelette De Fromage",
          description: "O..........",
          cost: 4.0,
          size: "Medium",
          image:
            "https://media.istockphoto.com/photos/omelette-picture-id155375267",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menuId: 2,
          name: "Double Cheese Burger",
          description: "Burger.",
          cost: 6.5,
          size: "Large",
          image:
            "https://media.istockphoto.com/photos/delicious-fresh-cooked-burger-with-a-side-of-french-fries-picture-id177556385",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menuId: 2,
          name: "Chicken Pizza",
          description: "Pizza.",
          cost: 9.0,
          size: "Large",
          image:
            "https://media.istockphoto.com/photos/delicious-vegetarian-pizza-on-white-picture-id1192094401",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menuId: 3,
          name: "Diet Coke",
          description: "Diet Coke.",
          cost: 1.5,
          size: "Small",
          image:
            "https://media.istockphoto.com/photos/can-of-cocacola-on-ice-picture-id487787108",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menuId: 3,
          name: "Cappucinno",
          description: "Cappucinno .......",
          cost: 1.5,
          size: "Medium",
          image:
            "https://media.istockphoto.com/photos/paper-coffee-cup-and-lid-isolated-on-white-picture-id1165889671?s=612x612",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Items", null, {});
  },
};
