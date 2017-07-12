import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import {MaterializeAction} from 'angular2-materialize';
import {TimeslotService} from '../services/timeslot.service';
import {Timeslot} from '../models/timeslot';
import {Observable} from 'rxjs/Observable';
import { Instructor } from '../models/instructor';
import { UserProfile } from '../models/userProfile';
import { GapiUserService } from '../services/gapi-user.service';
import { GapiCalendarService } from '../services/gapi-calendar.service';


@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {
	//model variables
  @Input() profile:UserProfile;
  @Input() instructor:Instructor;
  @Output() resetModalStatus = new EventEmitter();
  @Input()
  set open(parentClick:boolean){  
    if(parentClick){
      this.openModal();
    }
  }
  selectedDate:Date = new Date()
	selected:Timeslot;
  previousBooked:Timeslot;
	//datepicker config
	public myDatePickerOptions: IMyDpOptions = {
        // other options...
        markCurrentDay: true,
        inline:true,
        dateFormat: 'dd.mm.yyyy'
};
  public model: Object = new Date();
  public selectedDateNormal:string = '';
  public selectedTextNormal: string = '';
  public border: string = 'none';
  public placeholder: string = 'Select date';
  public disabled: boolean = true;


  //materialize collection variable
  highlightedDiv: number;

  //materialize Action variables
  modalActions = new EventEmitter<string|MaterializeAction>();
  successModalActions = new EventEmitter<string|MaterializeAction>();
  failureModalActions = new EventEmitter<string|MaterializeAction>();
  successModalMsg = 'Successfully Booked!!';

  constructor(public _timeslotService:TimeslotService,
              public gapiService: GapiUserService,
              public _calendarService:GapiCalendarService) { }

  ngOnInit() { }

  onDateChanged(event){
    if(event.jsdate){
      this.selectedDate = new Date(event.jsdate);
      this.highlightedDiv = 0;
      this.selected = null;
    }
    
  }

  //Materialize collection method to select time 
  toggleHighlight(newValue: number,timeslot:Timeslot) {
    this.selected = timeslot;

    if (this.highlightedDiv === newValue) {
      this.highlightedDiv = 0;
    }
    else {
      this.highlightedDiv = newValue;
    }
  }

  submit(){
    if(this.gapiService.isAuthenticated() && this.profile){
      this.book();
    }else{
      this.gapiService.signIn();
      return;  
    }
  }

  book(){
    this.selected.book(this.profile,this.instructor._id);
    this._timeslotService.create(this.selected)
      .then(response=>{
        console.log('Booking Successful');
        this.highlightedDiv = 0;
        this._timeslotService.getTimeslots(this.instructor);
        this._timeslotService.getBookings(this.profile);
        this.openSuccessModal();
      })
      .catch(err=>{
        console.log('Error booking',err);
        this.openFailureModal();
      })  
    
  }

addEventToUserCal(){
  this._calendarService.insertEvent(this.selected.start,this.selected.end, this.instructor).then(response=>{
    this.successModalMsg = 'Successfully added event to your calendar';
  });
}

//Materialize modal related methods
openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
}
closeModal() {
    this.selected = null;
    this.modalActions.emit({action:"modal",params:['close']});
    this.resetModalStatus.emit();
}
openSuccessModal() {
  this.successModalMsg = 'Successfully Booked!!'
  this.successModalActions.emit({action:"modal",params:['open']});
}
closeSuccessModal(){
  this.selected = null;
  this.successModalActions.emit({action:"modal",params:['close']});

}
openFailureModal(){
  this.selected = null;
  this.failureModalActions.emit({action:"modal",params:['open']});
}

}
