export class Timeslot {
	id:String;
	start:Date;
	end:Date;
	status:String;

	constructor(id:String,start:Date,end:Date){
		this.id = id;
		this.start = start;
		this.end = end;
		this.status = 'Open';
	}

	book(){
		this.status = 'Booked';
	}
}
