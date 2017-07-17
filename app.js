var express = require("express"),
	bodyParser = require('body-parser'),
	app = express(),
	mongoose =  require("mongoose"),
	Campground = require("./models/campground");
	Comment = require("./models/comment");
	seedDB = require("./seeds");
	mongoose.connect("mongodb://localhost/summercamp");
	app.use(bodyParser.urlencoded({extended: true}));	
	app.set("view engine","ejs");
	app.use(express.static(__dirname+"/public"))
	seedDB();


app.get("/", function(req, res){
	res.render("landing");
})	

app.get("/campgrounds", function(req, res)	{
	Campground.find({}, function(err, allcampgrounds)	{
		if (err)	{
			console.log(err);
		}	else	{
			res.render("campgrounds/index", {campgrounds:allcampgrounds});
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
	res.render("campgrounds/new");
})

app.get("/campgrounds/:id", function(req, res)	{
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground)	{
		if(err)
			console.log(err);
		else	{	
				console.log(foundCampground);
				res.render("campgrounds/show", {campground:foundCampground});
		}
	})
})

app.get("/campgrounds/:id/comments/new", function(req, res)	{
	Campground.findById(req.params.id, function(err, campground)	{
		if (err)	{
			console.log(err);
		}	else	{
			res.render("comments/new", {campground:campground});
		}
	});

});

app.post("/campgrounds/:id/comments", function(req, res)	{
	Campground.findById(req.params.id, function(err, campground)	{
		if(err)	{
			res.redirect("/campgrounds");
		}	else	{
			Comment.create(req.body.comment, function(err, comment)	{
				if(err)	{
					console.log(err);
				}	else	{
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/'+ campground._id);
				}
			});
		}
	});

});

app.listen(3003, function()	{
	console.log("The summer camp server is up");
})