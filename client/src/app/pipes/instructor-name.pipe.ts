import { Pipe, PipeTransform } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Pipe({
  name: 'instructorName'
})
export class InstructorNamePipe implements PipeTransform {

  transform(instructors:Observable<any>, filter: string): any {
    if(!instructors || !filter){
    	return instructors;
    }
    return instructors.filter(instructor=>{
    	return instructor.name.includes(filter);
    })
  }

}
