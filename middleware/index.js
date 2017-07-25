var middlewareObj  = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function (req, res, next)	{
		if (req.isAuthenticated())	{

	Campground.findById(req.params.id, function(err, foundCampground)	{
		if(err)	{
			res.redirect("back")
		}	else	{
			if(req.user._id .equals(foundCampground.author.id))	{
				next();
			}	else		{
				req.flash("error","You do not have the permission to edit this campground");
			}
		}
	})
}		else	{
					res.redirect("back");
				}

}

middlewareObj.checkCommentOwnership = function (req, res, next)	{
		if (req.isAuthenticated())	{

	Comment.findById(req.params.comment_id, function(err, foundComment)	{
		if(err)	{
			res.redirect("back")
		}	else	{
			if(req.user._id .equals(foundComment.author.id))	{
				next();
			}	else		{
				req.flash("error", "You do not have the permission to edit this comment");
				req.redirect("back");
			}
		}
	})
}		else	{
					res.redirect("back");
				}

}

middlewareObj.isLoggedIn = function (req, res, next)	{
	if(req.isAuthenticated())	{
		return next();
	}
	req.flash("error","You need to be logged in to do that!!!");
	res.redirect("/login");
}
module.exports = middlewareObj