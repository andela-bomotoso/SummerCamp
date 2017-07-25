var express = require("express");
var router = express.Router({mergeParams : true});
var Campground = require("../models/campground");
var middleware = require("../middleware");
router.get("/campgrounds", function(req, res)	{
	Campground.find({}, function(err, allcampgrounds)	{
		if (err)	{
			console.log(err);
		}	else	{
			res.render("campgrounds/index", {campgrounds:allcampgrounds});
		}
	})
})

router.post("/campgrounds", middleware.isLoggedIn, function(req, res)	{
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var price = req.body.price;

	var author = 	{
		id: req.user._id,
		username: req.user.username
	}
	
	var newCampground = {name:name, image: image, description:desc, price: price, author:author};
	
	Campground.create(newCampground, function(err, newlyCreated){
			if(err)	{
				req.flash("error", err);
			}	else	{
				req.flash("success", "Campground successfully created");
				res.redirect("/campgrounds");
			}
	});	
})

router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res)	{
	res.render("campgrounds/new");
})

router.get("/campgrounds/:id", function(req, res)	{
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground)	{
		if(err)
			req.flash("error", err);
		else	{	
				res.render("campgrounds/show", {campground:foundCampground});
		}
	})
})

//Edit Campground

router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res)	{
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
			req.flash("success", "Campground successfully updated");
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
});


//Delete Campground
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res)	{
	Campground.findByIdAndRemove(req.params.id, function(err)	{
		if (err)	{
			req.flash("error", err);
			res.redirect("/campgrounds");
		}	else	{
			req.flash("success", "Campground successfully deleted");
			res.redirect("/campgrounds");
		}
	})
})

module.exports = router;
