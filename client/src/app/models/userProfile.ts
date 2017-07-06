export class UserProfile {
	id:string;
	name:string;
	imageUrl:string;
	email:string;
	calendarId:string;

	constructor(name:string, imageUrl:string,email:string ){
		this.name = name;
		this.imageUrl = imageUrl;
		this.email = email;
	}

}