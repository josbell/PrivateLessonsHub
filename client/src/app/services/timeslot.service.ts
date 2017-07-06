import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import "rxjs";
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {Timeslot} from '../models/timeslot';
import {Instructor} from '../models/instructor';
import {Booking} from '../models/booking';

import {Observable} from 'rxjs/Observable';
import {asObservable} from "./asObservable";


@Injectable()
export class TimeslotService {

  private _timeslots:BehaviorSubject<Timeslot[]> = new BehaviorSubject([]);
  private _bookings:BehaviorSubject<Booking[]> = new BehaviorSubject([]);

  constructor(private _http:Http) { }

  get timeslots() {
        return asObservable(this._timeslots);
    }

  get bookings() {
    return asObservable(this._bookings);
  }

  getTimeslots(instructor){
    console.log('getTimeslots', instructor._id);
  	this._http.get('/timeslots/'+instructor._id)
      .subscribe(
        data=>{
          console.log(data);
          let timeslots = (<Object[]>data.json()).map((timeslot:any)=>
            new Timeslot(timeslot.id,timeslot.start,timeslot.end));
          console.log('After mapping',data);
          this._timeslots.next(timeslots);
          console.log('_timeslots and timeslots',this._timeslots, this.timeslots);
        },error=>console.log('Could not fetch timeslots',error));
  };

  getInstructors(){
    return this._http.get('/instructors')
      .map(data=>{
        let instructors = (<Object[]>data.json()).map((instructor:any)=>
            new Instructor(instructor._id,instructor.name,instructor.imageUrl,instructor.email));
            return instructors;
      });
  }

  getBookings(user){
    return this._http.get('/bookings/'+user.email)
      .subscribe(
        data=>{
          console.log(data);
          let bookings = (<Object[]>data.json()).map((booking:any)=>
            new Booking(booking._id,booking._instructor,booking._user,booking.gCalEventId, booking.start, booking.end,booking.cancelled));
            this._bookings.next(bookings);
        });
  }

  create(booking){
  	console.log("Server > POST '/booking",booking);
  	return this._http.post('/booking',booking)
  		.map(data=> {
        console.log(data);
        return data.json()
      }).toPromise()
  			
  }

  cancelBooking(booking){
    return this._http.post('cancel/booking/',booking)
      .map(data=>{
        console.log(data);
        return data.json()
      }).toPromise()
  }


  getAuthUrl(userData){
    console.log('service userData', userData);
    return this._http.post('/authurl',userData)
      .map(data=>{
        console.log(data);
        return data.json();
      })
      .toPromise()
  }

  storeAuthCode(authCode){
    console.log("Server > POST '/storeauthcode")
    return this._http.post('/storeauthcode', authCode)
      .map(data=>{
        console.log(data);
        return data.json()
      }).toPromise()
  }




}
