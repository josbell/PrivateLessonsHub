import { Injectable } from '@angular/core';
import { GapiUserService } from './gapi-user.service';
import { Http} from '@angular/http';

import "rxjs";
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {asObservable} from "./asObservable";

@Injectable()
export class GapiCalendarService {

  constructor(
  			private _userAuth: GapiUserService,
  			private _http: Http) { }

  private _calendars:BehaviorSubject<any> = new BehaviorSubject([]);

  get calendars() {
        return asObservable(this._calendars);
  }

	public getCalendarList(){
		let token = this._userAuth.getToken();
	    let url = 'https://www.googleapis.com/calendar/v3/users/me/calendarList'+ '?access_token=' + token;
	    this._http.get(url)
	    	.map(data=>data.json())
	    	.subscribe(data=>this._calendars.next(data.items))
	};

	public insertEvent(start,end, instructor){
		let calendarList = 'primary';
		let token = this._userAuth.getToken();
		let url = 'https://www.googleapis.com/calendar/v3/calendars/' + calendarList + '/events' + '?access_token=' + token;
		
		let requestBody = {
			'attachments':[],
			'attendees':[{
				'displayName': instructor.name,
				'email': instructor.email
			}],
			'start':{
				"dateTime":start
			},
			'end':{
				"dateTime":end
			},
			"reminders": {
			  "useDefault": true
			},
			'summary':"Private Lesson with " + instructor.name
		}
		return this._http.post(url,requestBody).map(data=>data.json()).toPromise()
	}


}
