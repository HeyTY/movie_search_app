var express 	= require("express");
var router		= express.Router();
var passport	= require("passport");
var User		= require("../models/user");



//===========================
//	ROOT ROUTE
//===========================
router.get("/", function(req, res){
	res.render("index");
});


//===========================
//	AUTHEN ROUTE
//===========================

// Show Sign Up Page
router.get("/register", function(req, res){
	res.render("register");
})

// Post Sign Up
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if (err){
			console.log(err);
			return res.render("/register")
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/chart");
		});
	});
});


//===========================
//	LOGIN ROUTE
//===========================

// Show Login Form
router.get("/login", function(req, res){
	res.render("login");
})

router.post("/login", passport.authenticate("local", {
	successRedirect: "/chart",
	failureRedirect: "/login"
	}),
	function (req, res) {
});

// Logout
router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/chart");
});

// Middleware
function isLoggedIn(req, res, next){
		if(req.isAuthenticated()){
			return next();
		}
		res.redirect("/login");
}

module.exports = router;