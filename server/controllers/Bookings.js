var GCALENDAR = require('../services/gCalendar.js');
var gCal = new GCALENDAR();
const path = require("path");
var mongoose = require('mongoose');
var Instructor = mongoose.model('Instructor');
var User = mongoose.model('User');
var Bookings = mongoose.model('Bookings');

module.exports={
    
	index:function(req, res){
		let userEmail = req.params.email;
		User.findOne({'email':userEmail})
			.populate({
				path: 'bookings',
				match: { start: { $gte: new Date() }},
				options: {sort: {start: 1 }},
     			populate:{ path:'_instructor'}
			})
			.exec(function(error, user) {
				if(error){
					console.log(error);
				}
				if(user){
					console.log(JSON.stringify(user, null, "\t"))
                	return res.json(user.bookings);
				}else{
					console.log(user);
					return res.json([]);
				}
            })
	},

	create:function(req,res){
		var gCal = new GCALENDAR()
		let data = req.body,
			user = data.booked_by,
			instructor_id = data.instructor_id,
			bookingData = {
				id:data.id,
				start: new Date(data.start),
				end: new Date(data.end)
			};
		let query = {'email':user.email}
		User.findOneAndUpdate(query,user,{upsert:true,'new':true},function(err,userDoc){
			if(err){
				console.log('Issue saving user', userDoc);
			}else{
				console.log('Saved new user successfully');
				var booking = new Bookings({'_instructor':instructor_id, 
											'_user':userDoc._id,
											'gCalEventId':bookingData.id,
											'start':bookingData.start,
											'end':bookingData.end });
				booking.save(function(err){
					if(err){
						console.log('Issue saving new Booking Model',err);
						return err;
					}else{
						console.log('Saved new Booking successfully');
						userDoc.bookings.push(booking._id);
						userDoc.save(function(err){
							if(err){
								console.log('Issue update user with booking');
							}else{
								Instructor.findByIdAndUpdate(
									instructor_id,
									{$push:{'bookings':booking}},
									{'new':true},
									function(err,instructorDoc){
										if(err){
											console.log('Issue updating Instructor Doc with Booking');
										}else{
											console.log('Updated Instuctor Doc with booking',userDoc,booking, instructorDoc);
											gCal.getToken(instructorDoc)
												.then((token)=>{
													return gCal.bookEvent(token,booking,instructorDoc.calendarId,userDoc)
												})
												.then(()=>{
													return res.json(booking);
												})
												.catch(err=>{
													console.log('Issue with updating events', err);
													return res.json(err);
												})
										}
									}
								)
						
							}
						})
					}
				})
			}
		});
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