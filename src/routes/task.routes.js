// Dependencies
const express = require("express");
const task = require("../models/task");
const router = express.Router();

// Imports
const Task = require("../models/task");

// Routes
router.get("/", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.get("/:id", async (req, res) => {
    const tasks = await Task.findById(req.params.id);
    res.json(tasks);
});

router.post("/", async (req, res) => {
    const { title, description } = req.body;
    const query = new Task({
        title: title,
        description: description
    });
    await query.save();
    res.json({
        status: true,
        massage: 'Task saved'
    });
});

router.put("/:id", async (req, res) => {
    const { title, description } = req.body;
    const newTask = { title, description };
    await Task.findByIdAndUpdate(req.params.id, newTask, {
        useFindAndModify: false
    });
    res.json({
        status: true,
        massage: 'Task updated'
    });
});

router.delete("/:id", async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({
        status: true,
        massage: 'Task deleted'
    });
});

// Export
module.exports = router;
