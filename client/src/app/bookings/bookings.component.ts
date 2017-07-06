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
  			console.log('Bookings component calling profile input event',userProfile);
  			this._profile = userProfile;
  			this._timeslotService.getBookings(userProfile);
  		}	
  	}

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
  	console.log(this.selectedBooking);
  	this._timeslotService.cancelBooking(this.selectedBooking)
  		.then(response=>{
  			console.log(response);
  			this._timeslotService.getBookings(this._profile);
  		})
  }

}
