var gCalendar = require('../services/gCalendar.js');

module.exports={

	index:function(req, res){
		gCalendar((timeslots)=>{
			//console.log('From Controller',timeslots);
			res.json(timeslots);
		});
	},

	create:function(req,res){
		console.log('Server received:', req.body);
		return res.json();
	}

}