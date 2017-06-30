import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import {MaterializeAction} from 'angular2-materialize';
import {TimeslotService} from '../services/timeslot.service';
import {Timeslot} from '../models/timeslot';
import {ChangeDetectorRef} from '@angular/core';
import { GapiUserService } from '../services/gapi-user.service';


@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {
	//model variables
  profile:any;
  timeslots:Timeslot[]=[];
  //@Output() updateTimeslots = new EventEmitter();
	dateSlots:Timeslot[]=[];
	selected:Timeslot;
  private _subscription;

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

  constructor(private _timeslotService:TimeslotService,
              public gapiService: GapiUserService, 
              private ref: ChangeDetectorRef) 
  {
    this.profile = gapiService.userProfile;
      console.log('constructing scheduling: Profile:', this.profile);
      this._subscription = gapiService.authChange
                            .subscribe((value)=>{
                              this.profile = value;
                              this.ref.detectChanges();
                              console.log('Called Subscription: Profile:', this.profile);
                            })
  }

  ngOnInit() {
    console.log('scheduler init');
    this.updateTimeslots();

    if(this.gapiService.isUserSignedIn()){
      this.profile = {
        'name':localStorage.getItem('name'),
        'email':localStorage.getItem('email'),
        'imageUrl':localStorage.getItem('imageUrl')
      }
    }

  }

  updateTimeslots(){
    console.log('updateTimeslots');
    this._timeslotService.getTimeslots()
      .then( data=>{
        this.timeslotFactory(data);
        this.initDateSlots();
      })
      .catch(err=>{
        console.log(err);
      }); 
  }

  timeslotFactory(data){
    this.timeslots = [];
    for(let slot of data){
      let newSlot = new Timeslot(slot.id, slot.start, slot.end)
      this.timeslots.push(newSlot)
    }
    
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

  //datePicker Method
  onDateChanged(event){
    if(event.jsdate){
      let date = new Date(event.jsdate);

      this.updateDateSlots(date);
      this.highlightedDiv = 0;
      this.selected = null;
    }
    
  }

  //Materialize collection method to select time 
  toggleHighlight(newValue: number) {
    console.log('toggleHighlight called');
    this.selected = this.dateSlots[newValue-1];

    if (this.highlightedDiv === newValue) {
      this.highlightedDiv = 0;
    }
    else {
      this.highlightedDiv = newValue;
    }
  }

  submit(){
    if(this.gapiService.isUserSignedIn()){
      this.selected.book(this.profile.name) 
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

//Materialize modal related methods
openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
}

}
