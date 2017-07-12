import { Component, OnInit, EventEmitter,Input, Output } from '@angular/core';
import {MaterializeAction} from 'angular2-materialize';
import {ChangeDetectorRef} from '@angular/core';
import { GapiUserService } from '../services/gapi-user.service';
import {Observable} from 'rxjs/Observable';
import { UserProfile } from '../models/userProfile';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Input() profile:Observable<UserProfile>;
  @Output() signInEvent = new EventEmitter();
  @Output() logOutEvent = new EventEmitter();
  public adminModalActions = new EventEmitter<string|MaterializeAction>();
  
  
  constructor(public gapiService: GapiUserService, 
              public ref: ChangeDetectorRef) {}

  ngOnInit() { 
  }

  signIn(){
    this.signInEvent.emit();
  }

  openModal() {
    this.adminModalActions.emit({action:"modal",params:['open']});
  }

  logout(): void {
    this.logOutEvent.emit();
  }
}
