const express = require("express");
const Board = require("../models/Board");
const Column = require("../models/Column");
const Item = require("../models/Item");

const router = express.Router();

router.post("/", async (req, res) => {
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

router.get("/list", async (req, res) => {
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

router.get("/:kanbanId", async (req, res) => {
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

router.put("/", async (req, res) => {
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

module.exports = router;
