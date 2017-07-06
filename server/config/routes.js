TimeSlots = require('../controllers/TimeSlots.js');
Instructors = require('../controllers/Instructors');
Bookings = require('../controllers/Bookings');
module.exports = function(app){
	const path = require("path");
	// For Angular Routing
	app.get('/timeslots/:id', function(req, res){
		TimeSlots.index(req,res);
	});

	app.get('/instructors', function(req,res){
		Instructors.index(req,res);
	})

	app.get('/bookings/:email',function(req,res){
		Bookings.index(req, res);
	})

	app.post('/authurl', function(req, res){
		Instructors.authUrl(req,res);
	});

	app.use("/oauthCallback", function (req, res) {
		Instructors.create(req,res);
	});

	app.post('/cancel/booking', function(req,res){
		Bookings.delete(req,res);
	})


	app.post('/booking', function(req, res){
		TimeSlots.create(req,res);
	});

	app.post('/storeauthcode', function(req,res){
		Instructors.create(req,res);
	});


	app.get('*', function (req, res) {
    	res.sendFile(path.resolve('../client/dist/index.html'));
	});


	
}