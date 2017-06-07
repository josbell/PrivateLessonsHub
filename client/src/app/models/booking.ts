export class Booking {
	start:Date;
	end:Date;
	summary:String = 'Booked';

	constructor(start:Date,end:Date){
		this.start = start;
		this.end = end;
	}
}
