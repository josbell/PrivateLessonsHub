import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {MaterializeAction} from 'angular2-materialize';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  profile:any;
  constructor(public auth: AuthService) { }

  ngOnInit() {
  	if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      console.log(this.profile);
    } else if(this.auth.isAuthenticated()) {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        console.log(this.profile);
      });
    }
  }

  isAdmin(){
    return this.profile && this.profile['https://privatelessons.com/roles'].includes('admin');
  }

}
