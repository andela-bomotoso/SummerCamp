var express = require("express");
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

var campgrounds = [
	{ name:"Campground A", image:"https://farm1.staticflickr.com/112/316612921_f23683ca9d.jpg"},
	{ name:"Campground B", image:"https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg"},
	{ name:"Campground C", image:"https://farm8.staticflickr.com/7273/7626532110_014dd97884.jpg"},
	{ name:"Campground A", image:"https://farm1.staticflickr.com/112/316612921_f23683ca9d.jpg"},
	{ name:"Campground B", image:"https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg"},
	{ name:"Campground C", image:"https://farm8.staticflickr.com/7273/7626532110_014dd97884.jpg"},
	{ name:"Campground A", image:"https://farm1.staticflickr.com/112/316612921_f23683ca9d.jpg"},
	{ name:"Campground B", image:"https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg"},
	{ name:"Campground C", image:"https://farm8.staticflickr.com/7273/7626532110_014dd97884.jpg"},
	{ name:"Campground A", image:"https://farm1.staticflickr.com/112/316612921_f23683ca9d.jpg"},
	{ name:"Campground B", image:"https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg"},
	{ name:"Campground C", image:"https://farm8.staticflickr.com/7273/7626532110_014dd97884.jpg"}
	]

app.get("/", function(req, res){
	res.render("landing");
})	

app.get("/campgrounds", function(req, res)	{
	
	res.render("campgrounds", {campgrounds:campgrounds});
})


app.post("/campgrounds", function(req, res)	{
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name:name, image: image};
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
})

app.get("/campgrounds/new", function(req, res)	{
	res.render("new");
})

	

app.listen(3000, function()	{
	console.log("The yelp camp server is up");
})