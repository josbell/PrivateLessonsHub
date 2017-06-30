import { Component, OnInit, EventEmitter } from '@angular/core';
import {MaterializeAction} from 'angular2-materialize';
import {ChangeDetectorRef} from '@angular/core';
import { GapiUserService } from '../services/gapi-user.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public profile:any;
  private myClientId: string = '858301130072-q7kvdksh72udbd8kg23kkhijg4sju3dc.apps.googleusercontent.com';
  private myScope: string = 'https://www.googleapis.com/auth/calendar';
  private _subscription;

  constructor(public gapiService: GapiUserService, 
              private ref: ChangeDetectorRef) 
  {
      this.profile = gapiService.userProfile;
      console.log('constructing nav bar: Profile:', this.profile);
      let _subscription = gapiService.authChange
                            .subscribe((value)=>{
                              this.profile = value;
                              this.ref.detectChanges();
                              console.log('Called Subscription: Profile:', this.profile);
                            })
   }


  ngOnInit() { 

    if(this.gapiService.isUserSignedIn()){
      this.profile = {
        'name':localStorage.getItem('name'),
        'email':localStorage.getItem('email'),
        'imageUrl':localStorage.getItem('imageUrl')
      }
    }
  }

  ngOnDestroy(){
    this._subscription.unsubscribe();
  }

  signIn(){
    this.gapiService.signIn();
  }

  

  requestOfflineAccess(){
    gapi.auth2.getAuthInstance().grantOfflineAccess({scope:this.myScope}).then((response)=>{
      console.log(response);
    })
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    console.log(authResult);

    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  logout(): void {
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


  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }


}
