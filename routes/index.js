var express = require("express");
var router = express.Router();

var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
	res.render("landing");
})	
//Authentication Routes

//Display user registration form
router.get("/register", function(req, res)	{
	res.render("register");
});

//Handle user registration
router.post("/register", function(req, res)	{
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user)	{
		if(err)	{
		  req.flash("error", err.message);
			return res.redirect("/register");
		}



		passport.authenticate("local")(req, res, function()	{
		req.flash("success", "Welcome to SummerCamps "+user.username);

			res.redirect("/campgrounds");
		});
	});
});

//Display the login form
router.get("/login", function(req, res)	{
	res.render("login");
});

//Handle user login
router.post("/login", passport.authenticate("local",{
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}),function(req, res)	{

});

//Handle user logout
router.get("/logout", function(req, res)	{
	req.logout();
	req.flash("success", "You have been logged out!!!");
	res.redirect("/campgrounds");
});

module.exports = router;
