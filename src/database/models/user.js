import roles from "../../utils/roles";

const { CUSTOMER, STAFF, ADMIN } = roles;

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Order, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      password: DataTypes.STRING,
      otp: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      role: DataTypes.ENUM(CUSTOMER, STAFF, ADMIN),
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
