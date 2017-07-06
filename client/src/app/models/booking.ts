import { UserProfile } from './userProfile';
import {Instructor} from './instructor';

export class Booking {
	_id:String;
	_instructor:Instructor;
	_user:string;
	gCalEventId:string;
	start:Date;
	end:Date;
	cancelled:boolean;

	constructor(id:string, instructor:Instructor, userId:string, gCalEventId:string, start:Date,end:Date, cancelled=false){
		this._id = id;
		this._instructor = instructor;
		this._user = userId;
		this.gCalEventId = gCalEventId;
		this.start = start
		this.end = end;
		this.cancelled = cancelled;
	}

	cancel(){
		this.cancelled = true;
	}

	get id(){
		return this._id;
	}

	get instructor(){
		return this._instructor;
	}

	get user(){
		return this._user;
	}


}
