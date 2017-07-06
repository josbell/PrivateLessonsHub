import { Component, OnInit } from '@angular/core';
import {ChangeDetectorRef} from '@angular/core';
import { GapiUserService } from '../services/gapi-user.service';
import { UserProfile } from '../models/userProfile';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-private-lessons',
  templateUrl: './private-lessons.component.html',
  styleUrls: ['./private-lessons.component.css']
})
export class PrivateLessonsComponent implements OnInit {
	public profile:UserProfile;
	private _subscription;

  	constructor(public gapiService: GapiUserService, 
              private ref: ChangeDetectorRef) {
      this.profile = gapiService.userProfile;
      let _subscription = gapiService.authChange
                            .subscribe((value)=>{
                              this.profile = value;
                              this.ref.detectChanges();
                              console.log('Called Subscription: Profile:', this.profile); })
	}

  ngOnInit() {
  	console.log('initializing private lessons');
  	if(this.gapiService.isUserSignedIn()){
      let name = localStorage.getItem('name'),
          imageUrl = localStorage.getItem('imageUrl'),
          email = localStorage.getItem('email');
      this.profile = new UserProfile(name,imageUrl,email);
  	}
  }

  onSignIn(){
  	console.log('onSignIn called');
  	this.gapiService.signIn();
  }

  onLogOut(): void {
    // Remove tokens and expiry time from localStorage
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut()
      .then(()=>{
        localStorage.clear();
        this.profile = null;
        console.log('Img url', this.profile);
        this.ref.detectChanges();

      })
  }

  ngOnDestroy(){
    this._subscription.unsubscribe();
  }

}
