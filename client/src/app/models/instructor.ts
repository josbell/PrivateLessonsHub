import {Timeslot} from './timeslot';

export class Instructor {
	_id:string;
	name:string;
	imageUrl:string;
	email:string;
	timeslots:Timeslot[];

	constructor(id:string, name:string, imageUrl:string, email:string ){
		this._id = id;
		this.name = name;
		this.imageUrl = imageUrl;
		this.email = email;
	}

}