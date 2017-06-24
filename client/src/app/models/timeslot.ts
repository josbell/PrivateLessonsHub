export class Timeslot {
	id:String;
	start:Date;
	end:Date;
	status:String;
	booked_by:String;

	constructor(id:String,start:Date,end:Date){
		this.id = id;
		this.start = start;
		this.end = end;
		this.status = 'Open';
	}

	book(booked_by = ''){
		this.status = 'Booked';
		this.booked_by = booked_by;
	}
}
