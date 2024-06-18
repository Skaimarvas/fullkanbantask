const { Sequelize } = require("sequelize");
const config = require("../config").development;

const { username, password, database, host, dialect, schema } = config;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  schema,
  //for log SQL queries
  logging: console.log,
});

module.exports = sequelize;
