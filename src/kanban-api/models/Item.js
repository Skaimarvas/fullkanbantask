const { DataTypes } = require("sequelize");
const sequelize = require("../services/db");
const config = require("../config/index");

const Board = require("../models/Board");
const Column = require("../models/Column");

const Item = sequelize.define(
  "Item",
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
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    columnId: {
      type: DataTypes.INTEGER,
      references: {
        model: Column,
        key: "id",
      },
    },
    boardId: {
      type: DataTypes.INTEGER,
      references: {
        model: Board,
        key: "id",
      },
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    schema: sequelize.options.schema,
  }
);

Board.hasMany(Item, { foreignKey: "boardId" });
Item.belongsTo(Board, { foreignKey: "boardId" });
Column.hasMany(Item, { foreignKey: "columnId" });
Item.belongsTo(Column, { foreignKey: "columnId" });

module.exports = Item;
