const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Contents extends Model {
    static associate(models) {
      Contents.belongsTo(models.Order, {
        foreignKey: "orderId",
      });
    }
  }
  Contents.init(
    {
      itemId: DataTypes.INTEGER,
      itemName: DataTypes.STRING,
      cost: DataTypes.DECIMAL,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Contents",
    }
  );
  return Contents;
};
