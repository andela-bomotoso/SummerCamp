var express = require("express");
var router = express.Router({mergeParams : true});
var Campground = require("../models/campground");

router.get("/campgrounds", function(req, res)	{
	Campground.find({}, function(err, allcampgrounds)	{
		if (err)	{
			console.log(err);
		}	else	{
			res.render("campgrounds/index", {campgrounds:allcampgrounds});
		}
	})
})

router.post("/campgrounds", isLoggedIn, function(req, res)	{
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;

	var author = 	{
		id: req.user._id,
		username: req.user.username
	}
	
	var newCampground = {name:name, image: image, description:desc, author:author};
	
	Campground.create(newCampground, function(err, newlyCreated){
			if(err)	{
				console.log(err);
			}	else	{
				res.redirect("/campgrounds");
			}
	});	
})

router.get("/campgrounds/new", isLoggedIn, function(req, res)	{
	res.render("campgrounds/new");
})

router.get("/campgrounds/:id", function(req, res)	{
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground)	{
		if(err)
			console.log(err);
		else	{	
				console.log(foundCampground);
				res.render("campgrounds/show", {campground:foundCampground});
		}
	})
})

//Edit Campground

router.get("/campgrounds/:id/edit", checkCampgroundOwnership, function(req, res)	{
			Campground.findById(req.params.id, function(err, foundCampground)	{
			res.render("campgrounds/edit", {campground:foundCampground});
			});
		});
//Update Campground
router.put("/campgrounds/:id", function(req, res)	{
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground)	{
		if(err)	{
			res.redirect("/campgrounds");
		}	else	{
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
});


//Delete Campground
router.delete("/campgrounds/:id", checkCampgroundOwnership, function(req, res)	{
	Campground.findByIdAndRemove(req.params.id, function(err)	{
		if (err)	{
			res.redirect("/campgrounds");
		}	else	{
			res.redirect("/campgrounds");
		}
	})
})

function isLoggedIn(req, res, next)	{
	if(req.isAuthenticated())	{
		return next();
	}
	res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next)	{
		if (req.isAuthenticated())	{

	Campground.findById(req.params.id, function(err, foundCampground)	{
		if(err)	{
			res.redirect("back")
		}	else	{
			if(req.user._id .equals(foundCampground.author.id))	{
				next();
			}	else		{
				res.send("You do not have the permission to edit this campground");
			}
		}
	})
}		else	{
					res.redirect("back");
				}

}

module.exports = router;
