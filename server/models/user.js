var mongoose = require('mongoose');
var Bookings = require('./booking.js');
module.exports = function(){
	var userSchema = new mongoose.Schema({
		email:{
			type:String,
			required:true
		},
		name:{
			type:String,
			required:true
		},
		imageUrl:String,
		bookings:[{
			type:mongoose.Schema.Types.ObjectId,
			ref:'Bookings'
		}],
	},{timestamps:true});

	mongoose.model('User',userSchema);
}