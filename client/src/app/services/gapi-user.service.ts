import { Injectable } from '@angular/core';
import {GoogleAuthService} from "ng-gapi";
import * as _ from "lodash";
import GoogleUser = gapi.auth2.GoogleUser;
import 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import { GapiCalendarService} from './gapi-calendar.service';

@Injectable()
export class GapiUserService {
    private user: GoogleUser;
    public userProfile:any;
    public authChange = new Subject<any>();

  	constructor(private googleAuth: GoogleAuthService) { }

    ngOnInit(){
        if(this.isUserSignedIn()){
            this.signIn();
        }
    }

    public getToken(): string {
        let token: string = localStorage.getItem('access_token');
        if (!token) {
            throw new Error("no token set , authentication required");
        }
        return token;
    }

    public signIn(): void {
        this.googleAuth.getAuth()
            .subscribe((auth) => {
                auth.signIn().then(res => this.signInSuccessHandler(res));
            });
    }

    public logOut():void{

    }

    public isUserSignedIn(): boolean {
        return !_.isEmpty(localStorage.getItem('access_token'));
    }


    private signInSuccessHandler(res: GoogleUser) {
        this.user = res;
      	this.storeAuthData(res.getAuthResponse(true));
        this.storeUserProfile(res);
    }

    private storeUserProfile(user: GoogleUser){
    	let googleProfile = user.getBasicProfile();
        let name = googleProfile.getName(),
            email = googleProfile.getEmail(),
            imageUrl = googleProfile.getImageUrl();

        localStorage.setItem('name',name);
        localStorage.setItem('email',email);
        localStorage.setItem('imageUrl',imageUrl);

    	this.userProfile = {
    		'name': name,
    		'email': email,
    		'imageUrl': imageUrl
    	}
        this.authChange.next(this.userProfile);
    }

    private storeAuthData(authResult): void {
	    // Set the time that the access token will expire at
	    const expiresAt = JSON.stringify((authResult.expires_in * 1000) + new Date().getTime());
	    localStorage.setItem('access_token', authResult.access_token);
	    localStorage.setItem('id_token', authResult.id_token);
	    localStorage.setItem('expires_at', authResult.expires_at);
  }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

}
