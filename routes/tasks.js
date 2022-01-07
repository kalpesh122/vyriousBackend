const express = require('express');
const {
    createTask,
    readTask,
    updateTask,
    deleteTask,
} = require('../controllers/tasks');

const router = express.Router();
const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');


router.route("/").post(protect, createTask).get(readTask)
router.route("/:id").put(protect, updateTask).delete(protect, deleteTask)

module.exports = router;