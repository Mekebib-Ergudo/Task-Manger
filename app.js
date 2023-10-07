require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const tasks = require("./router/task");
const connectDb = require("./db/connect");
// middelware
app.use(express.json()); // to parse the incoming requests with JSON payloads, and convert them into objects available under req.body property
app.use(cors());
// route
app.use("/api/v1/tasks", tasks);

// Port
const port = 3001;

// Db Connection async...
const start = async () => {
	try {
		await connectDb(process.env.Mongo_url);
		app.listen(port, console.log(`Server is running on ${port}`));
	} catch (error) {
		console.log(error);
	}
};

start();
