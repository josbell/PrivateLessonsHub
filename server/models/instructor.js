var mongoose = require('mongoose');
module.exports = function(){
	var instructorSchema = new mongoose.Schema({
		name:{
			type:String,
			required:true
		},
		bookings:[
			{
				type:mongoose.Schema.Types.ObjectId,
				ref:'Bookings'
			}
		],
		imageUrl:String,
		email:{
			type:String,
			lowercase:true
		}, //Validate gmail with exp*
		calendarId:String,
		access_token:String,
		refresh_token:String,
		token_type:String,
		expiry_date:String,
	
	},{timestamps:true});

	mongoose.model('Instructor',instructorSchema);
}