const Task = require("../model/Task");
const getAllTasks = async (req, res) => {
	try {
		const task = await Task.find({});
		res.status(200).json({ task });
	} catch (error) {
		console.log("Error in getting all tasks", error);
		res.status(500).json({ msg: error });
	}
};
// getting single task
const getTasks = async (req, res) => {
	try {
		const { id: taskID } = req.params;
		const task = await Task.findOne({ _id: taskID });
		if (!task) {
			return res
				.status(404)
				.json({ msg: "No task with the given id:" + taskID });
		}
		res.status(200).json({ task });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};
// Create Tasks
const createTasks = async (req, res) => {
	try {
		const task = await Task.create(req.body);
		res.status(201).json({ task });
	} catch (error) {
		res.status(500).json({ msg: error });
		console.log("Error in creating a new task", error);
	}
};
// delete Tasks
const deleteTasks = async (req, res) => {
	try {
		const { id: taskID } = req.params;
		const task = await Task.findByIdAndDelete({ _id: taskID });
		if (!task) {
			return res
				.status(404)
				.json({ msg: "No task with the given id:" + taskID });
		}
		res.json({ task });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const updateTasks = async (req, res) => {
	try {
		const { id: taskID } = req.params;
		const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
			new: true,
			runValidators: true, //this is to validate data before updating it
		});
		if (!task) {
			return res
				.status(404)
				.json({ msg: "No task with the given id:" + taskID });
		}
		res.status(200).json({ task });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};
// momdule export
module.exports = {
	getAllTasks,
	createTasks,
	updateTasks,
	deleteTasks,
	getTasks,
};
