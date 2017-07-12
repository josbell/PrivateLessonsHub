import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import {MaterializeAction} from 'angular2-materialize';
import {UserProfile} from '../models/userProfile';
import {TimeslotService} from '../services/timeslot.service';
import {Booking} from '../models/booking';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

	selectedBooking:Booking = null;
	modalActions = new EventEmitter<string|MaterializeAction>();
	_profile:UserProfile;
  	@Input() 
  	set profile(userProfile){
  		if(userProfile){
        this._timeslotService.getBookings(userProfile);
  			this._profile = userProfile;
  		}	
  	}
  public showCancelledFilter;

  constructor(private _timeslotService:TimeslotService) { }

  ngOnInit() {

  }

  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

  cacheSelectedBooking(booking:Booking){
  	this.selectedBooking = booking;
  }

  cancelSelectedBooking(){
  	this._timeslotService.cancelBooking(this.selectedBooking)
  		.then(response=>{
  			this._timeslotService.getBookings(this._profile);
  		})
  }

}
