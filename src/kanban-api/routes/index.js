const express = require("express");
const kanbanRoutes = require("../routes/kanban");
const taskRoutes = require("../routes/task");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to new designed Kanban List Api");
});

router.use("/kanban", kanbanRoutes);
router.use("/task", taskRoutes);

module.exports = router;
