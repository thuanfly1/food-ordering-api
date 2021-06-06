const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      Item.belongsTo(models.Menu, {
        foreignKey: "menuId",
      });
    }
  }
  Item.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      cost: DataTypes.DECIMAL,
      size: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
