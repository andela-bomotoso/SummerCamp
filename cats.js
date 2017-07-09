var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	color: String
});

var Cat = mongoose.model("Cat", catSchema);

// var crystal = new Cat({
// 	name: "Norris",
// 	age: 5,
// 	color: "black"
// });

// crystal.save(function(err, cat)	{
// 	if (err)	{
// 		console.log("Something went wrong");
// 	}	else	{
// 		console.log("A new cat info saved");
// 		console.log(cat);
// 	}
// })

Cat.create({
	name: "Snowy",
	age: 15,
	color: "brown"
}, function(err, cat)	{
	if(err)
		console.log(err);
	else
		console.log(cat);
});

Cat.find({}, function(err, cats)	{
	if(err)	{
		console.log("Error!");
	}	else	{
		console.log("All the Cats");
		console.log(cats);
	}
})