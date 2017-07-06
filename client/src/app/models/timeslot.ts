import { UserProfile } from './userProfile';

export class Timeslot {
	id:String;
	start:Date;
	end:Date;
	status:String;
	booked_by:UserProfile;
	instructor_id:string;

	constructor(id:String, start:Date,end:Date){
		this.id = id;
		this.start = start;
		this.end = end;
		this.status = 'Open';
	}

	book(booked_by:UserProfile ,instructor_id:string){
		this.status = 'Booked';
		this.booked_by = booked_by;
		this.instructor_id = instructor_id
	}
}
