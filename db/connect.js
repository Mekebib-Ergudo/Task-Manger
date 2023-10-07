// import mongoose module
const mongoose = require("mongoose");

// connect to mongodb using connection string
const connectDb = (url) => {
	return mongoose.connect(url, {
		useNewUrlParser: true, // use new url parser for mongo db version > v6
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	});
};
module.exports = connectDb;
