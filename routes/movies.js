var express		= require("express");
var router	 	= express.Router();
var request 	= require("request");
var Movie		= require("../models/movie");


//===========================
//	API  Movie Serch
//===========================

router.get("/results", function(req, res){
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
router.get("/results/:id", function(req, res){
	var query = req.query.showSearch;
	var url ="http://www.omdbapi.com/?i=" + query; 

	request( url, function(error, response, body){
		if (!error && response.statusCode === 200) {
			var data = JSON.parse(body) 
			res.render("showResults", {data: data});
		}
	});
});


//===========================
//	Movie Chart
//===========================
// CHART INDEX - 
router.get("/chart", function(req,res){
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
router.get("/chart/new",isLoggedIn , function (req, res) {
	res.render("movies/new");
})

// CREATE ROUTE
router.post("/chart",isLoggedIn , function (req, res){
	Movie.create(req.body.movie, function(err, newMovie){
		if (err) {
			res.render("new");
		} else {
			res.redirect("movies/chart");
		}
	})
});

// SHOW ROUTE - CHART
router.get("/chart/:id", function(req, res){
	Movie.findById(req.params.id).populate("comments").exec(function(err, foundMovie){
		if (err) {
			res.redirect("/chart");
		} else {
			res.render("movies/showChart", {movie: foundMovie});
		}
	});
});

// Middleware
function isLoggedIn(req, res, next){
		if(req.isAuthenticated()){
			return next();
		}
		res.redirect("/login");
}


module.exports = router;