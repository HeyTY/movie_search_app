var mongoose = require("mongoose");

var movieSchema = new mongoose.Schema({
	title: String,
	year: Number,
	poster: String,
	description: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});


module.exports = mongoose.model("Movie", movieSchema);