const { DataTypes } = require("sequelize");
const sequelize = require("../services/db");

const Board = require("../models/Board");

const Column = sequelize.define(
  "Column",
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
    itemsOrder: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
      defaultValue: [],
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    boardId: {
      type: DataTypes.INTEGER,
      references: {
        model: Board,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    schema: sequelize.options.schema,
  }
);

Column.belongsTo(Board, { foreignKey: "boardId" });
Board.hasMany(Column, { foreignKey: "boardId" });

module.exports = Column;
