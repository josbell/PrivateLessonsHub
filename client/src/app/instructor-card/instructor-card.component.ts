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

  constructor(private _timeslotService:TimeslotService) { }

  ngOnInit() { }


  fetchTimeslots(){
	this._timeslotService.getTimeslots(this.instructor);
	this.openChildModal = true;
  }

  onChildModalOpen(){
  	this.openChildModal = false;
  }

}
