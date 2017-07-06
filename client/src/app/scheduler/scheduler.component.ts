import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import {MaterializeAction} from 'angular2-materialize';
import {TimeslotService} from '../services/timeslot.service';
import {Timeslot} from '../models/timeslot';
import {Observable} from 'rxjs/Observable';
import { Instructor } from '../models/instructor';
import { UserProfile } from '../models/userProfile';
import { GapiUserService } from '../services/gapi-user.service';

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

	//datepicker config
	private myDatePickerOptions: IMyDpOptions = {
        // other options...
        markCurrentDay: true,
        inline:true,
        dateFormat: 'dd.mm.yyyy',
    };
  private model: Object = new Date();
  private selectedDateNormal:string = '';
  private selectedTextNormal: string = '';
  private border: string = 'none';
  private placeholder: string = 'Select date';
  private disabled: boolean = false;

  //materialize collection variable
  highlightedDiv: number;

  //materialize Action variables
  modalActions = new EventEmitter<string|MaterializeAction>();
  successModalActions = new EventEmitter<string|MaterializeAction>();
  failureModalActions = new EventEmitter<string|MaterializeAction>();

  constructor(private _timeslotService:TimeslotService,
              public gapiService: GapiUserService) { }

  ngOnInit() { 
    console.log('scheduler init', this.instructor);
    /*
    this.profile.subscribe(val=>{
      this.localProfile = val;
    });

    this.instructor.subscribe(val=>{
      this.localInstructor = val;
    })
    */
  }
/*
  updateTimeslots(){
    console.log('updateTimeslots');
    this._timeslotService.getTimeslots(this.instructor)
      .then( data=>{
        this.timeslotFactory(data);
        this.initDateSlots();
      })
      .catch(err=>{
        console.log(err);
      }); 
  }

*/

  //datePicker Method
  onDateChanged(event){
    if(event.jsdate){
      this.selectedDate = new Date(event.jsdate);
     // this.updateDateSlots(date);
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
    console.log(this.instructor, this.profile);
    if(this.profile){
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
        console.log('Booking Successful', response);
        this.highlightedDiv = 0;
        this._timeslotService.getTimeslots(this.instructor);
        this.selected = null;
        this.openSuccessModal();
      })
      .catch(err=>{
        console.log('Error booking',err);
        this.openFailureModal();
      })  
    
  }

/*
  submit(){
    if(this.gapiService.isUserSignedIn()){
      //this.selected.book(this.profile) 
      this._timeslotService 
        .create(this.selected)
        .then(()=>{
          console.log('Booking Succesful');
          this.highlightedDiv = 0;
          this.updateTimeslots();
          this.selected=null})
        .catch(err=>{
          console.log('Server returned this error:', err)
        });
    }else{
      this.gapiService.signIn()
    }
  }

  */

//Materialize modal related methods
openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
}
closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
    this.resetModalStatus.emit();
}
openSuccessModal() {
   this.successModalActions.emit({action:"modal",params:['open']});
}
openFailureModal(){
  this.failureModalActions.emit({action:"modal",params:['open']});
}

}
