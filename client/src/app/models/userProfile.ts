export class UserProfile {
	id:String;
	firstName:String;
	lastName:String;
	imageUrl:String;
	email:String;

	constructor(id:String,firstName:String,lastName:String, imageUrl:String,email:String ){
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.imageUrl = imageUrl;
		this.email = email;
	}

}