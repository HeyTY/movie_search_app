var mongoose = require("mongoose"),
    Movie    = require("./models/movie"),
    Comment  = require("./models/comment")



var data = [
	{
		title: "Rogue One: A Star Wars Story", 
		year:  	2016,
		poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg",
		description: "Blah blah"
	},
	{
		title: "Star Wars: The Clone Wars", 
		year:  	2008,
		poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTI1MDIwMTczOV5BMl5BanBnXkFtZTcwNTI4MDE3MQ@@._V1_SX300.jpg",
		description: "Blah blah blah"
	},
	{
		title: "Star Wars: The Force Awakens", 
		year:  	2016,
		poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg",
		description: "Blah blah blah blah"
	}
]
	

function seedDB() {
	//Remove all movies from DB
	Movie.remove({}, function(err){
	// 	if (err) {
	// 		console.log(err);
	// 	}
	// 	console.log("All Movies Removed!")
	// // Add few Movies into DB
	// 	data.forEach(function(seed){
	// 		Movie.create(seed, function(err, movie){
	// 			if (err) {
	// 				console.log(err);
	// 			} else {
	// 				console.log("Added a Movie!")
	// 				//Create a comment
	// 					Comment.create(
	// 						{
	// 							text:"I saw this movie last night, it was AMAZING!!!",
	// 							author:"Luke Skywalker"	
	// 					}, function(err, comment){
	// 						if (err) {
	// 							console.log(err);
	// 						} else {
	// 							movie.comments.push(comment);
	// 							movie.save();
	// 							console.log("Created a new comment")
	// 						}
	// 					});
	// 			}
	// 		})
	// 	});
	});
}

module.exports = seedDB;