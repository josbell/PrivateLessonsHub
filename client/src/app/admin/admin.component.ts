import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import {MaterializeAction} from 'angular2-materialize';
import {TimeslotService} from '../services/timeslot.service';
import { GapiUserService } from '../services/gapi-user.service';
import { GapiCalendarService } from '../services/gapi-calendar.service';

import { UserProfile } from '../models/userProfile';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @Input() profile:UserProfile;
  calendarId:string;
  authUrl:string ='';
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(public gapiService: GapiUserService,
              private timeslotService: TimeslotService,
              private _calendarService: GapiCalendarService) {}

  ngOnInit() { }

  getAuthUrl(){
    let userData = {
        'name':localStorage.getItem('name'),
        'email':localStorage.getItem('email'),
        'imageUrl':localStorage.getItem('imageUrl'),
        'calendarId': this.calendarId || 'primary'
      }
    this.timeslotService
      .getAuthUrl(userData)
      .then(response=>{
         this.authUrl=response.url
         window.location.href = this.authUrl})
      .catch(err=>{
        console.log('Err fecthing authUrl',err);
        alert('Something broke! Try again later');
      });
  }

  submit(){
    this.getAuthUrl();
  }

  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }


}
