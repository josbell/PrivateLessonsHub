import { Injectable } from '@angular/core';
import {GoogleAuthService} from "ng-gapi";
import * as _ from "lodash";
import GoogleUser = gapi.auth2.GoogleUser;
import 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class GapiUserService {
	public static readonly SESSION_STORAGE_KEY: string = 'accessToken';
    private user: GoogleUser;
    private myScope = 'https://www.googleapis.com/auth/calendar';
    public userProfile:any;
    public authChange = new Subject<any>();

  	constructor(private googleAuth: GoogleAuthService) { }

    public getToken(): string {
        let token: string = localStorage.getItem(GapiUserService.SESSION_STORAGE_KEY);
        if (!token) {
            throw new Error("no token set , authentication required");
        }
        return localStorage.getItem(GapiUserService.SESSION_STORAGE_KEY);
    }

    

    public signIn(): void {
        this.googleAuth.getAuth()
            .subscribe((auth) => {
                auth.signIn().then(res => this.signInSuccessHandler(res));
            });
    }

    public isUserSignedIn(): boolean {
        return !_.isEmpty(localStorage.getItem(GapiUserService.SESSION_STORAGE_KEY));
    }


    private signInSuccessHandler(res: GoogleUser) {
    	console.log(res);
        this.user = res;
        this.storeUserProfile(res);
      	this.storeAuthData(res.getAuthResponse(true));
         sessionStorage.setItem(
            GapiUserService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
        );
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

        console.log('gapi service: created userProfile', this.userProfile);
    }

    private storeAuthData(authResult): void {
	    // Set the time that the access token will expire at
	    console.log(authResult);
	    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
	    localStorage.setItem('access_token', authResult.accessToken);
	    localStorage.setItem('id_token', authResult.idToken);
	    localStorage.setItem('expires_at', expiresAt);
  }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }



    public getOfflineAccess(){
    	return gapi.auth2.getAuthInstance()
                .grantOfflineAccess({scope:this.myScope})
                .then();
    }

}
