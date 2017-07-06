import { Component, OnInit, Input } from '@angular/core';
import { Instructor } from '../models/instructor';
import {Observable} from 'rxjs/Observable';
import { UserProfile } from '../models/userProfile';
import {TimeslotService} from '../services/timeslot.service';
import {Timeslot} from '../models/timeslot';

@Component({
  selector: 'app-instructor-card',
  templateUrl: './instructor-card.component.html',
  styleUrls: ['./instructor-card.component.css']
})
export class InstructorCardComponent implements OnInit {
	@Input() instructor:Instructor;
	@Input() profile:UserProfile;
	openChildModal:boolean=false;
	//timeslots:Observable<Timeslot[]>;
	dateSlots:Timeslot[]=[];

  constructor(private _timeslotService:TimeslotService) {
  //	let timeslotsSubscription = this._timeslotService.timeslots.subscribe(response=>{
  //		console.log('Instructor Controller', response);
  //	});
  }

  ngOnInit() {
  	console.log('instructor card init', this.instructor);
  	//let timeslots = this._timeslotService.timeslots;
  	//timeslots.subscribe();
  }


  fetchTimeslots(){
	this._timeslotService.getTimeslots(this.instructor);
	this.openChildModal = true;
  }

  onChildModalOpen(){
  	console.log('onChildModalOpen called');
  	this.openChildModal = false;
  }

/*
  updateTimeslots(){
    this.timeslots = this._timeslotService.getTimeslots(this.instructor);
    this.timeslots.subscribe(()=>{
    	console.log('Timeslots loaded for ', this.instructor);
    });
  }


  initDateSlots(){
    let today = new Date()
    this.updateDateSlots(today);
  }

  updateDateSlots(date:Date){
    this.dateSlots = [];
    let dateString = date.toDateString();

    this.timeslots.forEach((timeslot)=>{
      let timeslotStartDay = new Date(timeslot.start).toDateString();
      if(timeslotStartDay == dateString ){
        this.dateSlots.push(timeslot)
      }
    })
  };

*/

}
