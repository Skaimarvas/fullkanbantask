const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

//In-memory data store

const INITIAL_COLUMN_ORDER = ["column-1", "column-2", "column-3", "column-4"];

const INITIAL_COL_DATA = {
  "column-1": {
    id: "column-1",
    title: "Backlog",
    itemsOrder: ["item-1", "item-2"],
  },
  "column-2": {
    id: "column-2",
    title: "To do",
    itemsOrder: ["item-3", "item-4", "item-5", "item-6", "item-7"],
  },
  "column-3": {
    id: "column-3",
    title: "In progress",
    itemsOrder: ["item-8", "item-9", "item-10", "item-11"],
  },
  "column-4": {
    id: "column-4",
    title: "Designed",
    itemsOrder: ["item-12", "item-13"],
  },
};

const ITEMS = {
  "item-1": {
    id: "item-1",
    title: "Twilio integration",
    description:
      "Create new note via SMS. Support text, audio, links, and media.",
    status: "",
  },
  "item-2": {
    id: "item-2",
    title: "Markdown support",
    description: "Markdown shorthand converts to formatting",
    status: "Formatting",
  },
  "item-3": {
    id: "item-3",
    title: "Tablet view",
    description: "",
    status: "",
  },
  "item-4": {
    id: "item-4",
    title: "Mobile view",
    description:
      "Functions for both web responsive and native apps. Note: Android and iOS will need unique share icons.",
    status: "",
  },
  "item-5": {
    id: "item-5",
    title: "Audio recording in note",
    description: "Show audio in a note and playback UI",
    status: "Note interface",
  },
  "item-6": {
    id: "item-6",
    title: "Bookmark in note",
    description:
      "Show rich link UI in a note, and feature to render website screenshot.",
    status: "Note interface",
  },
  "item-7": {
    id: "item-7",
    title: "Image viewer",
    description:
      "Opens when clicking on the thumbnail in the list or on the image in the note",
    status: "",
  },
  "item-8": {
    id: "item-8",
    title: "Desktop view",
    description:
      "PWA for website and native apps. Note: Windows and Mac will need unique share icons.",
    status: "",
  },
  "item-9": {
    id: "item-9",
    title: "Mobile home screen",
    description: "Folders, tags, and notes lists are sorted by recent.",
    status: "",
  },
  "item-10": {
    id: "item-10",
    title: "Formatting options",
    description:
      "Mobile formatting bar expands and collapses when tapping the format icon.",
    status: "",
  },
  "item-11": {
    id: "item-11",
    title: "Media in note",
    description: "Image & video with player UI",
    status: "Note interface",
  },
  "item-12": {
    id: "item-12",
    title: "Audio recording",
    description: "Interface for when recording a new audio note",
    status: "New Note",
  },
  "item-13": {
    id: "item-13",
    title: "Bookmarking",
    description: "Interface for when creating a new link note.",
    status: "New Note",
  },
};

//Create (Post) a new List

app.post("/list", (req, res) => {
  const newColumn = req.body;
  const newColumnId = `column-${INITIAL_COLUMN_ORDER.length + 1}`;

  //Update INITIAL_COL_DATA with new column
  INITIAL_COL_DATA[newColumnId] = {
    id: newColumnId,
    title: newColumn.title,
    itemsOrder: [],
  };

  // Update INITIAL_COLUMN_ORDER
  INITIAL_COLUMN_ORDER.push(newColumnId);

  res.status(201).json({
    message: "New column added successfully",
    column: INITIAL_COL_DATA[newColumnId],
  });
});

app.get("/list", (req, res) => {
  res.status(200).json({
    order: INITIAL_COLUMN_ORDER,
    column: INITIAL_COL_DATA,
    items: ITEMS,
  });
});
