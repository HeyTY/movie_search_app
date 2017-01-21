var express 	= require("express"),
	app 		= express(),
	request 	= require("request"),
	mongoose	= require("mongoose")

mongoose.connect("mongodb://localhost/ymdb");
app.use(express.static("public"));
app.set("view engine", "ejs");


// SCHEMA SETUP
var movieSchema = new mongoose.Schema({
	title: String,
	year: Number,
	poster: String,
	description: String
});

//Create Model
var Movie = mongoose.model("Movie", movieSchema);

// Movie.create(
// {
// 	title: "Dragon Ball Z: Battle of Gods", 
// 	year:  	2013,
// 	poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMGE5NWY1M2MtOGQ5NS00Zjg4LThmNTEtNGVkMWMxNDBjMDdlXkEyXkFqcGdeQXVyMjc2Nzg5OTQ@._V1_SX300.jpg",
// 	description: "The Z-Fighters must contend with Lord Beerus, the God of Destruction, but only a God can fight a God, and none of them are Gods. However with the creation of the Super Saiyan God, will the Z-Fighters be able to defeat Lord Beerus?"
// }, function (err, movie) {
// 	if (err){
// 		console.log(err);
// 	}else {
// 		console.log("======== NEW MOVIE ADDED =========")
// 		console.log(movie);
// 	}
// });





app.get("/", function(req, res){
	res.render("index");
});

// RESULTS FROM SEARCH
app.get("/results", function(req, res){
	// get data from input putting it into a variable
	var query =  req.query.search;
	var url = "https://www.omdbapi.com/?s=" + query;

	request( url, function(error, response, body){
		if (!error && response.statusCode === 200) {
			var data = JSON.parse(body) // parses string into an object
			res.render("results", {data: data});
		}
	});
});

// Chart - Show all Top movies
app.get("/chart", function(req,res){
	// Get all movies from DB
	Movie.find({}, function(err, allMovies){
		if (err) {
			console.log(err);
		} else {
			res.render("topChart", {movie: allMovies})
		}
	});
});









app.listen(3000, function(){
	console.log("Server Deployed");
});

