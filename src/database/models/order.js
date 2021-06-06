const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.hasMany(models.Contents, {
        foreignKey: "orderId",
      });
      Order.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Order.init(
    {
      total: DataTypes.DECIMAL,
      status: DataTypes.STRING,
      paymentId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
