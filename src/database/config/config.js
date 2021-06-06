require("dotenv").config();

const {
  DEV_DB_USERNAME,
  DEV_DB_PASSWORD,
  DEV_DB_NAME,
  DEV_DB_HOSTNAME,
  PROD_DB_USERNAME,
  PROD_DB_PASSWORD,
  PROD_DB_NAME,
  PROD_DB_HOSTNAME,
  PROD_DB_PORT,
} = process.env;

module.exports = {
  development: {
    username: DEV_DB_USERNAME,
    password: DEV_DB_PASSWORD,
    database: DEV_DB_NAME,
    host: DEV_DB_HOSTNAME,
    dialect: "mysql",
  },
  production: {
    username: PROD_DB_USERNAME,
    password: PROD_DB_PASSWORD,
    database: PROD_DB_NAME,
    host: PROD_DB_HOSTNAME,
    dialect: "mysql",
  },
};
