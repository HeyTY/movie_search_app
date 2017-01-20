var express = require("express");
var app = express();
var request = require("request");

app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", function(req, res){
	res.render("index");
});




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








app.listen(3000, function(){
	console.log("Server Deployed");
});

