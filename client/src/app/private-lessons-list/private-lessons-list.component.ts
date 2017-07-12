import { Component, OnInit, Input } from '@angular/core';
import {TimeslotService} from '../services/timeslot.service';
import { Instructor } from '../models/instructor';
import {Observable} from 'rxjs/Observable';
import { UserProfile } from '../models/userProfile';

@Component({
  selector: 'app-private-lessons-list',
  templateUrl: './private-lessons-list.component.html',
  styleUrls: ['./private-lessons-list.component.css']
})
export class PrivateLessonsListComponent implements OnInit {
  @Input() profile:Observable<UserProfile>;
  instructors: Observable<Instructor[]>;
  public filterName = '';
  constructor(public _timeslotService:TimeslotService) { }

  ngOnInit() {
    this.instructors = this._timeslotService.getInstructors();
  }

}
