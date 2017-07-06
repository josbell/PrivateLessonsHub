var mongoose = require('mongoose');
var Instructor = require('./instructor.js');
module.exports = function(){
	var bookingsSchema = new mongoose.Schema({
		_instructor:{
			type:mongoose.Schema.Types.ObjectId, 
			ref:'Instructor'
		},
		_user:{
			type:mongoose.Schema.Types.ObjectId,
			ref:'User'
		},
		cancelled:Boolean,
		gCalEventId:String,
		start:{
			type:Date,
			required:true
		},
		end:{
			type:Date,
			required:true
		}
	},{timestamps:true});

	mongoose.model('Bookings',bookingsSchema);
}