var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data  = [
{
	name: "Cloud's Rest",
	image: "https://farm4.staticflickr.com/3282/2770447094_2c64348643.jpg",
	description: "Very nice campground facility"
},
	{
	name: "Mini House",
	image: "https://farm5.staticflickr.com/4101/4961777592_322fea6826.jpg",
	description: "A campground with a touch of home feeling"
},

{
	name: "Shady Campground",
	image: "https://farm7.staticflickr.com/6089/6094103869_d53a990c83.jpg",
	description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc"
}

]

function seedDB()	{
	Campground.remove({}, function(err)	{
// 	if (err)	
// 		console.log(err);
// 	else	{
// 		console.log("All campgrounds removed");
// 	}
// });
// 	data.forEach(function(seed)	{
// 	Campground.create(seed, function(err, campground)	{
// 		if (err)	{
// 			console.log(err);
// 		}	else	{
// 			console.log("added a campground");
// 			Comment.create(
// 			{
// 				text: "This is a great place but I wish there was internet",
// 				author: "Homer"
// 			}, function(err, comment)	{
// 				if (err)	{
// 					console.log(err);
// 				}	else	{
// 					campground.comments.push(comment);
// 					campground.save();
// 					console.log("Created new comment");
// 				}
// 			})
// 		}
// 	});
});
}



module.exports = seedDB;

