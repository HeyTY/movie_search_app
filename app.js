var express 	= require("express"),
	app 		= express(),
	request 	= require("request"),
	mongoose	= require("mongoose"),
	bodyParser  = require("body-parser"),
	Movie       = require("./models/movie"),
	Comment     = require("./models/comment"),
	seedDB		= require("./seeds")


mongoose.connect("mongodb://localhost/ymdb");
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
seedDB();


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

// PAGINATE SEARCH RESULTS





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
			res.render("movies/chart", {allMovies: allMovies})
		}
	});
});

// NEW ROUTE
app.get("/chart/new", function (req, res) {
	res.render("movies/new");
})

// CREATE ROUTE
app.post("/chart", function (req, res){
	Movie.create(req.body.movie, function(err, newMovie){
		if (err) {
			res.render("new");
		} else {
			res.redirect("movies/chart");
		}
	})
});

// SHOW ROUTE - CHART
app.get("/chart/:id", function(req, res){
	Movie.findById(req.params.id).populate("comments").exec(function(err, foundMovie){
		if (err) {
			res.redirect("/chart");
		} else {
			res.render("movies/showChart", {movie: foundMovie});
		}
	});
});

//===========================
//	COMMENTS ROUTE
//===========================

// NEW COMMENT FORM
app.get("/chart/:id/comments/new", function(req, res){
	// Find movie by ID

	Movie.findById(req.params.id, function(err, movie){
		if (err) {
			console.log(err);
			res.redirect("/chart");
		} else {
			res.render("comments/new", {movie: movie});
		}
	});
});

// COMMENT POST ROUTE

app.post("/chart/:id/comments", function(req, res){
	// lookup movie by ID
	Movie.findById(req.params.id, function (err, movie){
		if (err){
			console.log(err);
			res.redirect("/chart");
		} else {
	// create a new comment
	Comment.create(req.body.comment, function(err, comment){
		if (err) {
			console.log(err);
		} else {
			movie.comments.push(comment);
			movie.save();
			res.redirect("/chart/" + movie._id);	
		}		
		});
		}
	;})
})




app.listen(3000, function(){
	console.log("Server Deployed");
});

