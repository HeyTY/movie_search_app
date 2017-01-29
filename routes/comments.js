var express 	= require("express");
var router		= express.Router();
var Movie  		= require("../models/movie");
var Comment		= require("../models/comment");



//===========================
//	COMMENTS ROUTE
//===========================

// New Comment Form
router.get("/chart/:id/comments/new", isLoggedIn, function(req, res){
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

// Comment Post Route
router.post("/chart/:id/comments", isLoggedIn, function(req, res){
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

// Middleware
function isLoggedIn(req, res, next){
		if(req.isAuthenticated()){
			return next();
		}
		res.redirect("/login");
}

module.exports = router;