const { DataTypes } = require("sequelize");
const sequelize = require("../services/db");

const Board = sequelize.define(
  "Board",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      autoIncrementIdentity: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    columnsOrder: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    timestamps: false,
    schema: sequelize.options.schema,
  }
);

module.exports = Board;
