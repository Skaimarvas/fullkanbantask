const express = require("express");
const Column = require("../models/Column");
const Item = require("../models/Item");

const router = express.Router();

router.post("/", async (req, res) => {
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

router.put("/move", async (req, res) => {
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

module.exports = router;
