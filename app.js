var express = require("express"),
	bodyParser = require('body-parser'),
	passport = require('passport'),
	localStrategy = require('passport-local'),
	methodOverride = require('method-override'),
	flash = require('connect-flash');
	app = express(),
	mongoose =  require("mongoose"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment"),
	seedDB = require("./seeds");

	var commentRoutes = require("./routes/comments"),
		campgroundRoutes = require("./routes/campgrounds"),
		indexRoutes = require("./routes/index")


	//mongoose.connect("mongodb://localhost/summercamp");
	mongoose.connect("mongodb://grace:password@ds125053.mlab.com:25053/summercamp");

	app.use(bodyParser.urlencoded({extended: true}));	
	app.set("view engine","ejs");
	app.use(express.static(__dirname+"/public"));
	app.use(methodOverride("_method"));
	app.use(flash());

	User = require("./models/user");
	//seedDB();



	//passport configuration
	app.use(require("express-session")({
		secret: "I am a World Class Developer",
		resave: false,
		saveUninitialized: false
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	passport.use(new localStrategy(User.authenticate()));
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());

	app.use(function(req, res, next)	{
		res.locals.currentUser = req.user;
		res.locals.success = req.flash("success");
		res.locals.error =req.flash("error");
		next();
	})

	app.use(indexRoutes);
	app.use(commentRoutes);
	app.use(campgroundRoutes);

app.listen(3000, function()	{
	console.log("The summer camp server is up");
})