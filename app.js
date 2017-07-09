var express = require("express");
	bodyParser = require('body-parser')
	app = express();
	mongoose =  require("mongoose")

	mongoose.connect("mongodb://localhost/summercamp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");


// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
// 	name: "Family Camp",
// 	image: "https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg",
// 	description:"This is a family campground, spacious enough for all family members"
// }, function(err, campground)	{
// 	if (err)
// 		console.log(err);
// 	else
// 		console.log(campground);
// })



app.get("/", function(req, res){
	res.render("landing");
})	

app.get("/campgrounds", function(req, res)	{
	Campground.find({}, function(err, allcampgrounds)	{
		if (err)	{
			console.log(err);
		}	else	{
			res.render("index", {campgrounds:allcampgrounds});
		}
	})
})


app.post("/campgrounds", function(req, res)	{
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name:name, image: image, description:desc};
	
	Campground.create(newCampground, function(err, newlyCreated){
			if(err)	{
				console.log(err);
			}	else	{
				res.redirect("/campgrounds");
			}
	});	
})

app.get("/campgrounds/new", function(req, res)	{
	res.render("new");
})

app.get("/campgrounds/:id", function(req, res)	{
	Campground.findById(req.params.id, function(err, foundCampground)	{
		if(err)
			console.log(err);
		else	{
				res.render("show", {campground:foundCampground});
		}
	})
})

	

app.listen(3000, function()	{
	console.log("The summer camp server is up");
})