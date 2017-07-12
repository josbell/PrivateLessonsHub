import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from "angular2-materialize";
import { MyDatePickerModule } from 'mydatepicker';
import {routing} from './app.routes';
import { GoogleApiModule } from 'ng-gapi';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HeroComponent } from './hero/hero.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { PrivateLessonsListComponent } from './private-lessons-list/private-lessons-list.component';
import { PrivateLessonsDetailsComponent } from './private-lessons-details/private-lessons-details.component';
import { FooterComponent } from './footer/footer.component';
import { CallbackComponent} from './callback/callback.component';
import {GoogleSignInComponent} from 'angular-google-signin';

import {TimeslotService} from './services/timeslot.service';
import {GapiUserService} from './services/gapi-user.service';
import {GapiCalendarService} from './services/gapi-calendar.service';

import { AdminComponent } from './admin/admin.component';
import { PrivateLessonsComponent } from './private-lessons/private-lessons.component';
import { InstructorCardComponent } from './instructor-card/instructor-card.component';
import { DaySelectedPipe } from './pipes/day-selected.pipe';
import { BookingsComponent } from './bookings/bookings.component';
import { InstructorNamePipe } from './pipes/instructor-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HeroComponent,
    SchedulerComponent,
    PrivateLessonsListComponent,
    PrivateLessonsDetailsComponent,
    FooterComponent,
    CallbackComponent,
    AdminComponent,
    GoogleSignInComponent,
    PrivateLessonsComponent,
    InstructorCardComponent,
    DaySelectedPipe,
    BookingsComponent,
    InstructorNamePipe  
 ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    MyDatePickerModule,
    routing,
    GoogleApiModule.setConfig(
    {
      clientId: '858301130072-q7kvdksh72udbd8kg23kkhijg4sju3dc.apps.googleusercontent.com',
      discoveryDocs:["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
      scope:'https://www.googleapis.com/auth/calendar'
    }), 
  ],
  providers: [TimeslotService, GapiUserService, GapiCalendarService],
  bootstrap: [AppComponent],
})
export class AppModule { }





