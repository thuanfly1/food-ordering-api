const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    static associate(models) {
      Menu.hasMany(models.Item, {
        foreignKey: "menuId",
      });
    }
  }
  Menu.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Menu",
    }
  );
  return Menu;
};
