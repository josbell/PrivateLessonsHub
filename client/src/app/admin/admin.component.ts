import { Component, OnInit, EventEmitter } from '@angular/core';
import {MaterializeAction} from 'angular2-materialize';
import {GoogleSignInSuccess} from 'angular-google-signin';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  //materialize Action variables
  modalActions = new EventEmitter<string|MaterializeAction>();
  private myClientId: string = '858301130072-q7kvdksh72udbd8kg23kkhijg4sju3dc.apps.googleusercontent.com';
  private myScope: string = 'https://www.googleapis.com/auth/calendar';

  constructor() {}

  ngOnInit() {

  }

  onGoogleSignInSuccess(event: GoogleSignInSuccess) {
    let googleUser: gapi.auth2.GoogleUser = event.googleUser;
    let id: string = googleUser.getId();
    let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
    console.log('ID: ' +
      profile
        .getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Profile: ', profile);

    //gapi.auth2.getAuthInstance().grantOfflineAccess({scope:this.myScope}).then((response)=>{
    //  console.log(response);
   // })
  }

  grantAccess(){
    gapi.auth2.getAuthInstance().grantOfflineAccess({scope:this.myScope}).then((response)=>{
      console.log(response);
    })
  }



  //Materialize modal related methods
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }


}
