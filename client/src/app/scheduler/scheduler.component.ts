import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import {MaterializeAction} from 'angular2-materialize';
import {TimeslotService} from '../services/timeslot.service';
import {Booking} from '../models/booking';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {
	//model variables
  timeslots:any[];
  //@Output() updateTimeslots = new EventEmitter();
	dateSlots:any[]=[];
	selected:any;

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

  constructor(private _timeslotService:TimeslotService) { }

  ngOnInit() {
    this._timeslotService.getTimeslots()
      .then( returnedTimeslots=>{
        this.timeslots = returnedTimeslots;
        this.initDateSlots();
      })
      .catch(err=>{
        console.log(err);
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

  //datePicker Method
  onDateChanged(event){
    let date = new Date(event.jsdate);
    this.updateDateSlots(date);
    this.highlightedDiv = 0;
    this.selected = '';
  }

  //Materialize collection method to select time 
  toggleHighlight(newValue: number) {
    this.selected = this.dateSlots[newValue-1];

    if (this.highlightedDiv === newValue) {
      this.highlightedDiv = 0;
    }
    else {
      this.highlightedDiv = newValue;
    }
  }

  submit(){
    let start = new Date(this.selected.start);
    let end = new Date(this.selected.end);
    let booking = new Booking(start, end);
    this._timeslotService
      .create(booking)
      .then(()=>{this.selected=''})
      .catch(err=>{
        console.log('Server returned this error:', err)
      });

  }

//Materialize modal related methods
openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

}
