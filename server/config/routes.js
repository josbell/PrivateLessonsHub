TimeSlots = require('../controllers/TimeSlots.js');

module.exports = function(app){
	const path = require("path");
	// For Angular Routing
	app.get('/timeslots', function(req, res){
		TimeSlots.index(req,res);
	});

	app.post('/booking', function(req, res){
		TimeSlots.create(req,res);
	})

	app.get('*', function (req, res) {
    	res.sendFile(path.resolve('../client/dist/index.html'));
	});
	
}