import { Component, OnInit, EventEmitter } from '@angular/core';
import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  //materialize Action variables
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor() { }

  ngOnInit() {
  }

  //Materialize modal related methods
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }


}
