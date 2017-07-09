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
	image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
// 	name: "Campground B",
// 	image: "https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg"
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
			res.render("campgrounds", {campgrounds:allcampgrounds});
		}
	})
})


app.post("/campgrounds", function(req, res)	{
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name:name, image: image};
	
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

	

app.listen(3000, function()	{
	console.log("The summer camp server is up");
})