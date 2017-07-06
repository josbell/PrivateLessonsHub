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
		
		/*
		console.log('Timeslots Controller Index get call');
		var gCal = new GCALENDAR()
		gCal.getAuth()
			.then(getToken)
			.then(gCal.listEvents)
			.then((timeslots)=>{
				return res.json(timeslots)})
			.catch((err)=>{
				console.log(err)
			});
		*/
		//return res.json('');
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
				let booking = new Booking({'_instructor':instructor_id, 
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
											console.log(userDoc,booking, instructorDoc);
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
	}

}