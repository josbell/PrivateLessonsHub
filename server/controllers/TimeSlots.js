//var GCALENDAR = require('../services/gCalendar.js');

module.exports={
    
	index:function(req, res){
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
		return res.json('');
	},	

	create:function(req,res){
		var gCal = new GCALENDAR()
		console.log('Create Controller',req.body);
 	 	gCal.getAuth()
 	 		.then((auth)=>gCal.updateEvent(auth,req.body))
 	 		.then((response)=>{
 	 			return res.json(response);
 	 		})
 	 		.catch((err)=>res(err))
		
	},

	newToken:function(req,res){
		console.log(req);
		res.json(req.body);
	}

}