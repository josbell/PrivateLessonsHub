var GCALENDAR = require('../services/gCalendar.js');
var gCal = new GCALENDAR();
const path = require("path");
var mongoose = require('mongoose');
var Instructor = mongoose.model('Instructor');
module.exports={
    
	index:function(req, res){
		Instructor.find({},'_id name email imageUrl',function(err,instructors){
			if(instructors){
				res.json(instructors);
			}else if(err){
				console.log('Error getting instructors',err);
				res.json([]);
			}else{
				return res.json([]);
			}
		});
	},

	authUrl:function(req,res){
		let userData = req.body;
		gCal.getAuthUrl(userData)
			.then(url=>{
				if(url){
					return res.json({'url':url});
				}else{
					console.log('Url not returned');
					return res.json();
				}
			})
	},	

	create:function(req,res){
		var userData = JSON.parse(decodeURIComponent(req.query.state));
	    var code = req.query.code; // the query param code
		gCal.getNewToken(code)
			.then((newToken)=>{
				Object.assign(userData,newToken);
				var query = {'email':userData.email};
			    Instructor.update(query,userData,{upsert:true},function(err, raw){
			      if(err){
			        console.log('Issue saving user with token to DB');
			      }else{
			        console.log('Stored new token in MongoDB');
			      }
				})
				res.redirect('/');
			})
			.catch(err=>{
				console.log(err);
				res.redirect('/');
			})
	}

}