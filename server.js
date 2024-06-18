const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to KanbanList Api!");
});

const config = require("./config").development;
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    schema: config.schema,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("PostgreSQL connected"))
  .catch((err) => console.log("Error connecting to PostgreSQL: ", err));

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
    schema: config.schema,
  }
);

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
    schema: config.schema,
  }
);

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
    schema: config.schema,
  }
);
Board.hasMany(Item, { foreignKey: "boardId" });
Item.belongsTo(Board, { foreignKey: "boardId" });
Board.hasMany(Column, { foreignKey: "boardId" });
Column.belongsTo(Board, { foreignKey: "boardId" });
Column.hasMany(Item, { foreignKey: "columnId" });
Item.belongsTo(Column, { foreignKey: "columnId" });

sequelize
  .sync({ force: true })
  .then(async () => {
    console.log("Database & tables created");
    const defaultBoard = await Board.create({
      title: "Sample Board",
      columnsOrder: [],
    });
    const columns = [
      { title: "Backlog", order: 1, boardId: defaultBoard.id },
      { title: "To Do", order: 2, boardId: defaultBoard.id },
      { title: "In Progress", order: 3, boardId: defaultBoard.id },
      { title: "Designed", order: 4, boardId: defaultBoard.id },
    ];

    const columnPromises = columns.map((columnData) =>
      Column.create(columnData)
    );
    const createdColumns = await Promise.all(columnPromises);
    const columnsOrder = createdColumns.map((column) => column.order);
    await defaultBoard.update({ columnsOrder });

    const items = [
      {
        title: "Twilio integration",
        description:
          "Create new note via SMS. Support text, audio, links, and media.",
        status: "Formatting",
        color: "bg-[#C340A1]",
        columnId: createdColumns[0].id,
        boardId: defaultBoard.id,
        order: 1,
      },
      {
        title: "Markdown support",
        description: "Markdown shorthand converts to formatting.",
        status: "Formatting",
        color: "bg-[#6A6DCD]",
        columnId: createdColumns[0].id,
        boardId: defaultBoard.id,
        order: 2,
      },
      {
        title: "Tablet view",
        description: "",
        status: "",
        color: "bg-[#D93535]",
        columnId: createdColumns[1].id,
        boardId: defaultBoard.id,
        order: 3,
      },
      {
        title: "Mobile view",
        description:
          "Functions for both web responsive and native apps. Note: Android and iOS will need unique share icons.",
        status: "",
        color: "bg-[#D93535]",
        columnId: createdColumns[1].id,
        boardId: defaultBoard.id,
        order: 4,
      },
      {
        title: "Audio recording in note",
        description: "Show audio in a note and playback UI",
        status: "Note interface",
        color: "bg-[#6A6DCD]",
        columnId: createdColumns[1].id,
        boardId: defaultBoard.id,
        order: 5,
      },
      {
        title: "Bookmark in note",
        description:
          "Show rich link UI in a note, and feature to render website screenshot.",
        status: "Note interface",
        color: "bg-[#6A6DCD]",
        columnId: createdColumns[1].id,
        boardId: defaultBoard.id,
        order: 6,
      },
      {
        title: "Image viewer",
        description:
          "Opens when clicking on the thumbnail in the list or on the image in the note",
        status: "",
        color: "bg-[#6A6DCD]",
        columnId: createdColumns[1].id,
        boardId: defaultBoard.id,
        order: 7,
      },
      {
        title: "Desktop view",
        description:
          "PWA for website and native apps. Note: Windows and Mac will need unique share icons.",
        status: "",
        color: "bg-[#D93535]",
        columnId: createdColumns[2].id,
        boardId: defaultBoard.id,
        order: 8,
      },
      {
        title: "Mobile home screen",
        description: "Folders, tags, and notes lists are sorted by recent.",
        status: "",
        color: "bg-[#307FE2]",
        columnId: createdColumns[2].id,
        boardId: defaultBoard.id,
        order: 9,
      },
      {
        title: "Formatting options",
        description:
          "Mobile formatting bar expands and collapses when tapping the format icon.",
        status: "",
        color: "bg-[#307FE2]",
        columnId: createdColumns[2].id,
        boardId: defaultBoard.id,
        order: 10,
      },
      {
        title: "Media in note",
        description: "Image & video with player UI",
        status: "Note interface",
        color: "bg-[#6A6DCD]",
        columnId: createdColumns[2].id,
        boardId: defaultBoard.id,
        order: 11,
      },
      {
        title: "Audio recording",
        description: "Interface for when recording a new audio note",
        status: "New Note",
        color: "bg-[#00A88B]",
        columnId: createdColumns[3].id,
        boardId: defaultBoard.id,
        order: 12,
      },
      {
        title: "Bookmarking",
        description: "Interface for when creating a new link note.",
        status: "New Note",
        color: "bg-[#00A88B]",
        columnId: createdColumns[3].id,
        boardId: defaultBoard.id,
        order: 13,
      },
    ];

    const itemPromises = items.map((itemData) => Item.create(itemData));

    const createdItems = await Promise.all(itemPromises);

    const itemsByColumn = createdItems.reduce((acc, item) => {
      if (!acc[item.columnId]) {
        acc[item.columnId] = [];
      }
      acc[item.columnId].push(item.id);
      return acc;
    }, {});

    await Promise.all(
      createdColumns.map((column) => {
        return column.update({ itemsOrder: itemsByColumn[column.id] || [] });
      })
    );
  })
  .catch((err) => console.log("Error creating database tables: ", err));

//Create (Post) a new kanban

app.post("/kanban", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const createdBoard = await Board.create({
      title,
      columnsOrder: [],
    });

    const columns = [
      { title: "Backlog", order: 1, boardId: createdBoard.id },
      { title: "To Do", order: 2, boardId: createdBoard.id },
      { title: "In Progress", order: 3, boardId: createdBoard.id },
      { title: "Designed", order: 4, boardId: createdBoard.id },
    ];

    const columnPromises = columns.map((columnData) =>
      Column.create(columnData)
    );

    const createdColumns = await Promise.all(columnPromises);
    const columnsOrder = createdColumns.map((column) => column.id);

    await createdBoard.update({
      columnsOrder,
    });

    res.status(201).json({
      message: "New kanban was created successfully",
      board: createdBoard,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/kanbanlist", async (req, res) => {
  try {
    const foundBoards = await Board.findAll();
    if (!foundBoards) {
      return res.status(404).json({ error: "Boards are not found" });
    }

    res.status(200).json(foundBoards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/kanban/:kanbanId", async (req, res) => {
  const { kanbanId } = req.params;
  try {
    const columns = await Column.findAll({
      where: { boardId: kanbanId },
      include: Item,
      order: [["order", "ASC"]],
    });

    const foundBoard = await Board.findByPk(kanbanId);

    if (!foundBoard) {
      return res.status(404).json({ error: "Board not found" });
    }

    //Json take only one argument
    res.status(200).json({ columns, foundBoard });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/kanban", async (req, res) => {
  try {
    const { boardDataId, updatedColumnOrders } = req.body;
    if (boardDataId && updatedColumnOrders) {
      const boardData = await Board.findByPk(boardDataId);
      await boardData.update({ columnsOrder: updatedColumnOrders });
      const columns = await Column.findAll({
        where: { boardId: boardDataId },
        include: Item,
        order: [["id", "ASC"]],
      });

      const columnUpdatePromises = columns.map((column, index) =>
        column.update({
          order: updatedColumnOrders[index],
        })
      );

      await Promise.all(columnUpdatePromises);

      res.status(201).json({ message: "Update was successful" });
    } else {
      res
        .status(400)
        .json({ message: "Board id or updatedColumnOrders is required" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/task", async (req, res) => {
  const { title, description, status, columnId, color, boardId } = req.body;

  try {
    if (title && columnId) {
      const highestOrderItem = await Item.findOne({
        where: { boardId },
        order: [["order", "DESC"]],
      });

      const newOrder = highestOrderItem ? highestOrderItem.order + 1 : 1;
      const column = await Column.findByPk(columnId);

      const newItem = await Item.create({
        title,
        description,
        status,
        columnId,
        color: color || "bg-[#307FE2]",
        boardId,
        order: newOrder,
      });

      const updatedItemsOrder = [...column.itemsOrder, newItem.order];
      await column.update({ itemsOrder: updatedItemsOrder });

      res.status(201).json({
        message: "New item added successfully",
        item: newItem,
      });
    } else {
      res.status(400).json({ error: "Title or Column Id is required" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/task/move", async (req, res) => {
  try {
    const { columnId, updatedTaskOrder, itemId, newColumnId } = req.body;
    if (columnId && updatedTaskOrder) {
      const columnData = await Column.findByPk(columnId);
      await columnData.update({ itemsOrder: updatedTaskOrder });
      if (itemId && newColumnId) {
        const foundItem = await Item.findByPk(itemId);
        await foundItem.update({
          columnId: newColumnId,
        });
      }

      res.status(201).json({ message: "Items order updated successfully" });
    } else {
      res
        .status(400)
        .json({ message: "Column id or updatedTaskOrder is required" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
