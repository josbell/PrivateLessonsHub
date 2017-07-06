var GCALENDAR = require('../services/gCalendar.js');
var gCal = new GCALENDAR();
const path = require("path");
var mongoose = require('mongoose');
var Instructor = mongoose.model('Instructor');
var User = mongoose.model('User');
var Bookings = mongoose.model('Bookings');

module.exports={
    
	index:function(req, res){
		console.log('Booking Controller Index called', req.params.email);
		let userEmail = req.params.email;
		User.findOne({'email':userEmail})
			.populate({
				path: 'bookings',
				match: { start: { $lte: new Date() }},
     			populate:{ path:'_instructor'}
			})
			.exec(function(error, user) {
                console.log(JSON.stringify(user, null, "\t"))
                res.json(user.bookings);
            })
	},
	
	delete:function(req,res){
		console.log('Booking Controller Delete called', req.body);
		let booking  = req.body
		let instructor = booking._instructor;		
		gCal.getToken(booking._instructor)
			.then((token)=>{
				return gCal.cancelEvent(token,booking,instructor.calendarId)
			})
			.then(()=>{
				Bookings.findByIdAndUpdate(
					booking._id,
					{cancelled:true},
					{'new':true},
					function(err,bookingDoc){
						if(err){
							console.log('Issue updating Booking Doc to cancelled',err);
							return res.json(err);
						}else{
							console.log('Successfully updated Booking Doc to cancelled', bookingDoc);
							return res.json(bookingDoc);
						}
					})
			})

	}

}