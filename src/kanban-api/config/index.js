const dotenv = require("dotenv");

dotenv.config({ path: "../../.env" });

console.log("PROCESS ENV IN KANBAN API", process.env);

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    schema: process.env.DB_SCHEMA,
  },
};
