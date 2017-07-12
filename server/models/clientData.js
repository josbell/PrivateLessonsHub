var mongoose = require('mongoose');
module.exports = function(){
	var apiCredentialsSchema = new mongoose.Schema({
		apiName:String,
		clientSecret:String,
		clientId:String,
		redirectionUrl:String
	},{timestamps:true});

	mongoose.model('ApiCrendentials',apiCredentialsSchema);
}