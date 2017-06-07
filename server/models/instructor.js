var mongoose = require('mongoose');
module.exports = function(){
	var instructorSchema = new mongoose.Schema({
		name:{
			type:String,
			required:true
		},
		gCalSettings:{
			gmail:{
				type:String,
				lowercase:true
			}, //Validate gmail with exp*
			gPassword:String,
			token:String,
			refreshToken:String
		}
	},{timestamps:true});

	mongoose.model('Instructor',instructorSchema);
}