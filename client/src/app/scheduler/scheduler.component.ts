import { Component, OnInit, EventEmitter } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import {MaterializeAction} from 'angular2-materialize';


@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {
	//model variables
	timeSlotsForSelectedDay:any[];
	timeSlots:any[];
	timeSlotSelected:any;

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

  constructor() { }

  ngOnInit() {
  }

  //datePicker Method
  onDateChanged(event){
  	console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
  	console.log(this);
        if(event.formatted !== '') {
            this.selectedTextNormal = 'Formatted: ' + event.formatted + ' - epoc timestamp: ' + event.epoc;
            this.border = '1px solid #CCC';
            this.selectedDateNormal = event.formatted;
        }
        else {
            this.selectedTextNormal = '';
            this.border = 'none';
        }

  	return;
  }

//Materialize collection method to select time 
toggleHighlight(newValue: number) {
  if (this.highlightedDiv === newValue) {
    this.highlightedDiv = 0;
  }
  else {
    this.highlightedDiv = newValue;
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
