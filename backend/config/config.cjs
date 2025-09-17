require("dotenv").config();

module.exports = {
  development: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: process.env.DB_DIALECT || "postgres",
  },
  test: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE + "_test",
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: process.env.DB_DIALECT || "postgres",
  },
  production: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: process.env.DB_DIALECT || "postgres",
  },
};
