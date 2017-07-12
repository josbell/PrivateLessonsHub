var GCALENDAR = require('../services/gCalendar.js');
var gCal = new GCALENDAR();
var mongoose = require('mongoose');
var Instructor = mongoose.model('Instructor');
var User = mongoose.model('User');
var Booking = mongoose.model('Bookings');

module.exports={
    
	index:function(req, res){
		Instructor.findById(req.params.id,(err,data)=>{
			if(!err){
				let instructor = data;
				gCal.getToken(instructor)
					.then((token)=>{
						return gCal.listEvents(token,instructor.calendarId)
					})
					.then((timeslots)=>{
						return res.json(timeslots);
					})
					.catch((err)=>{
						console.log(err);
						return res.json(err);
					})
			}else{
				console.log('Issue retrieving instructor', err);
				return res.json(err);
			}
		});
	}	

}