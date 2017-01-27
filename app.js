var express 			= require("express"),
	app 				= express(),
	request 			= require("request"),
	mongoose			= require("mongoose"),
	passport			= require("passport"),
	LocalStrategy 		= require("passport-local"),
	bodyParser  		= require("body-parser"),
	Movie       		= require("./models/movie"),
	Comment     		= require("./models/comment"),
	User 				= require("./models/user"),
	seedDB				= require("./seeds")


// Requiring routes
var	movieRoutes		= require("./routes/movies"),
	commentsRoutes	= require("./routes/comments"),
	indexRoutes		= require("./routes/index")


mongoose.connect("mongodb://localhost/ymdb");
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
seedDB();

// Passport Config

app.use(require("express-session")({
	secret: "Link-NSX",
	resave: false,
	saveUninitialized: false

}));

app.use(passport.initialize());
app.use(passport.session());

passport.use( new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});


app.use(indexRoutes);
app.use(movieRoutes);
app.use(commentsRoutes);


app.listen(3000, function(){
	console.log("Server Deployed");
});

