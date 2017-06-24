import { Component, OnInit, Input } from '@angular/core';
import {TimeslotService} from '../services/timeslot.service';

@Component({
  selector: 'app-private-lessons-list',
  templateUrl: './private-lessons-list.component.html',
  styleUrls: ['./private-lessons-list.component.css']
})
export class PrivateLessonsListComponent implements OnInit {
	timeslots:any[];

  constructor(private _timeslotService:TimeslotService) { }

  ngOnInit() {
    console.log('private-lessons-list init');
  }

  updateTimeslots(){
    this._timeslotService.getTimeslots()
      .then( returnedTimeslots=>{
        this.timeslots = returnedTimeslots;
      })
      .catch(err=>{console.log(err);});
  }

}
