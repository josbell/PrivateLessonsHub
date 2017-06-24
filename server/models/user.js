var mongoose = require('mongoose');
var Bookings = require('./booking.js');
module.exports = function(){
	var userSchema = new mongoose.Schema({
		id:String,
		name:{
			type:String,
			required:true
		},
		bookings:[{
			type:mongoose.Schema.Types.ObjectId,
			ref:'Bookings'
		}],
	},{timestamps:true});

	mongoose.model('User',userSchema);
}