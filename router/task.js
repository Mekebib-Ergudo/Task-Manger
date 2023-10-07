const express = require("express");
const {
	getAllTasks,
	createTasks,
	updateTasks,
	getTasks,
	deleteTasks,
} = require("../controller/controller");
const router = express.Router();

router.route("/").get(getAllTasks).post(createTasks);
router.route("/:id").patch(updateTasks).get(getTasks).delete(deleteTasks);
//  module exports
module.exports = router;
