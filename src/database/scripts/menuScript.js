import models from "../models";

const { Menu, Item } = models;

const clearMenu = async () => {
  await models.sequelize.query('DELETE FROM "Items";');
  await models.sequelize.query('DELETE FROM "Menus";');
};

const createItems = async (id, name) => {
  switch (name) {
    case "Bữa sáng":
      await Item.create({
        menuId: id,
        name: "French Omelette De Fromage",
        description: "O.......",
        cost: 4.0,
        size: "Medium",
        image:
          "https://media.istockphoto.com/photos/omelette-picture-id155375267",
      });
      break;
    case "Bữa trưa/Bữa tối":
      await Item.create({
        menuId: id,
        name: "Double Cheese Burger",
        description: "Burger.",
        cost: 6.5,
        size: "Large",
        image:
          "https://media.istockphoto.com/photos/delicious-fresh-cooked-burger-with-a-side-of-french-fries-picture-id177556385",
      });
      await Item.create({
        menuId: id,
        name: "Chicken Pizza",
        description: "Pizza.",
        cost: 9.0,
        size: "Large",
        image:
          "https://media.istockphoto.com/photos/delicious-vegetarian-pizza-on-white-picture-id1192094401",
      });
      break;
    case "Đồ uống":
      await Item.create({
        menuId: id,
        name: "Diet Coke",
        description: "Diet Coke không đường.",
        cost: 1.5,
        size: "Small",
        image:
          "https://media.istockphoto.com/photos/can-of-cocacola-on-ice-picture-id487787108",
      });
      await Item.create({
        menuId: id,
        name: "Cappucinno",
        description: "Cappuccino ngon nhất.",
        cost: 1.5,
        size: "Medium",
        image:
          "https://media.istockphoto.com/photos/paper-coffee-cup-and-lid-isolated-on-white-picture-id1165889671?s=612x612",
      });
      break;
    default:
      break;
  }
};

const createCategories = async () => {
  const categoriesData = [
    { name: "Breakfast" },
    { name: "Lunch/Dinner" },
    { name: "Drinks" },
  ];
  categoriesData.forEach(async (category) => {
    const menu = await Menu.findOrCreate({
      where: { name: category.name },
      defaults: category,
    });
    const { id, name } = menu[0];
    await createItems(id, name);
  });
};

const createMenu = async () => {
  await clearMenu();
  await createCategories();
};

createMenu();

export default createMenu;
