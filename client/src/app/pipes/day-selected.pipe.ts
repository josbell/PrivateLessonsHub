import { Pipe, PipeTransform } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Pipe({
  name: 'daySelected'
})
export class DaySelectedPipe implements PipeTransform {

  transform(value: Observable<any>, args?: any): any {
  	if (!value) return value;
    let selectedDate = new Date(args);
    return value.filter(timeslot=>{
    	let timeslotDate = new Date(timeslot.start).toDateString();
    	let selectedDateString = selectedDate.toDateString();
    	return  timeslotDate == selectedDateString
    });
  }

}
