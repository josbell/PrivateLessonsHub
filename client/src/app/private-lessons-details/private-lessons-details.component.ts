import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private-lessons-details',
  templateUrl: './private-lessons-details.component.html',
  styleUrls: ['./private-lessons-details.component.css']
})
export class PrivateLessonsDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	console.log('private-lessons-list init');
  }

}
