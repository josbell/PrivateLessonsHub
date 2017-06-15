import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import {MaterializeAction} from 'angular2-materialize';
import {TimeslotService} from '../services/timeslot.service';
import {Timeslot} from '../models/timeslot';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {
	//model variables
  timeslots:Timeslot[]=[];
  //@Output() updateTimeslots = new EventEmitter();
	dateSlots:Timeslot[]=[];
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

  constructor(private _timeslotService:TimeslotService) { }

  ngOnInit() {
    this.updateTimeslots();
  }

  updateTimeslots(){
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
    for(let slot of data){
      console.log(slot.id)
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
    let date = new Date(event.jsdate);
    this.updateDateSlots(date);
    this.highlightedDiv = 0;
    this.selected = null;
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
    this.selected.book() //Updates timeslot status to "Booked"
    this._timeslotService //Calls service to update event to booked
      .create(this.selected)
      .then(()=>{
        console.log('Booking Succesful');
        this.updateTimeslots();
        this.selected=null})
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
