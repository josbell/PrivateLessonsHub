import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import "rxjs";
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {asObservable} from "./asObservable";

import {Timeslot} from '../models/timeslot';
import {Instructor} from '../models/instructor';
import {Booking} from '../models/booking';




@Injectable()
export class TimeslotService {

  public _timeslots:BehaviorSubject<Timeslot[]> = new BehaviorSubject([]);
  public _bookings:BehaviorSubject<Booking[]> = new BehaviorSubject([]);
  public _filteredBookings:BehaviorSubject<Booking[]> = new BehaviorSubject([]);

  constructor(public _http:Http) { }

  get timeslots() {
        return asObservable(this._timeslots);
    }

  get bookings() {
    return asObservable(this._bookings);
  }

  get filteredBookings(){
    return asObservable(this._filteredBookings);
  }

  getTimeslots(instructor){
  	this._http.get('/timeslots/'+instructor._id)
      .subscribe(
        data=>{
          let timeslots = (<Object[]>data.json()).map((timeslot:any)=>
            new Timeslot(timeslot.id,timeslot.start,timeslot.end));
            this._timeslots.next(timeslots);
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
    this._http.get('/bookings/'+user.email)
      .subscribe(
        data=>{
          let bookings = (<Object[]>data.json()).map((booking:any)=>
            new Booking(booking._id,booking._instructor,booking._user,booking.gCalEventId, booking.start, booking.end,booking.cancelled));
           this._bookings.next(bookings);
          let filteredBookings = bookings.filter((booking)=>{
            return !booking.cancelled;
          })
          this._filteredBookings.next(filteredBookings);
        });
  }

  create(booking){
  	return this._http.post('/booking',booking)
  		.map(data=> {
        return data.json()
      }).toPromise()
  			
  }

  cancelBooking(booking){
    return this._http.post('cancel/booking/',booking)
      .map(data=>{
        return data.json()
      }).toPromise()
  }


  getAuthUrl(userData){
    return this._http.post('/authurl',userData)
      .map(data=>{
        return data.json();
      })
      .toPromise()
  }

  storeAuthCode(authCode){
    return this._http.post('/storeauthcode', authCode)
      .map(data=>{
        return data.json()
      }).toPromise()
  }




}
