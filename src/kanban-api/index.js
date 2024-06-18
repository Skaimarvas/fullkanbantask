const express = require("express");
const routes = require("./routes/index");
const sequelize = require("./services/db");
const Board = require("./models/Board");
const Column = require("./models/Column");
const Item = require("./models/Item");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", routes);

const config = require("./config").development;
const port = config.port;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

sequelize
  .authenticate()
  .then(() => console.log("PostgreSQL connected"))
  .catch((err) => console.log("Error connecting to PostgreSQL: ", err));

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
