var express 	= require("express"),
	app 		= express(),
	request 	= require("request"),
	mongoose	= require("mongoose"),
	bodyParser  = require("body-parser")

mongoose.connect("mongodb://localhost/ymdb");
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


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

// INDEX HOMPAGE RESULTS FROM SEARCH
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

// SHOW - RESULT FROM SEARCH
app.get("/results/:id", function(req, res){
	var query = req.query.showSearch;
	var url ="http://www.omdbapi.com/?i=" + query; 

	request( url, function(error, response, body){
		if (!error && response.statusCode === 200) {
			var data = JSON.parse(body) 
			res.render("showResults", {data: data});
		}
	});
});


// CHART INDEX - 
app.get("/chart", function(req,res){
	// Get all movies from DB
	Movie.find({}, function(err, allMovies){
		if (err) {
			console.log(err);
		} else {
			// 1. key can be anything : 2. value follows above
			res.render("chart", {allMovies: allMovies})
		}
	});
});

// NEW ROUTE
app.get("/chart/new", function (req, res) {
	res.render("new");
})

// CREATE ROUTE
app.post("/chart", function (req, res){
	Movie.create(req.body.movie, function(err, newMovie){
		if (err) {
			res.render("new");
		} else {
			res.redirect("/chart");
		}
	})
});

// SHOW ROUTE - CHART
app.get("/chart/:id", function(req, res){
	Movie.findById(req.params.id, function(err, foundMovie){
		if (err) {
			res.redirect("/chart");
		} else {
			res.render("showChart", {movie: foundMovie});
		}
	});
});








app.listen(3000, function(){
	console.log("Server Deployed");
});

