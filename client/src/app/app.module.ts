import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from "angular2-materialize";
import { MyDatePickerModule } from 'mydatepicker';
import {routing} from './app.routes';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HeroComponent } from './hero/hero.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { PrivateLessonsComponent } from './private-lessons/private-lessons.component';
import { PrivateLessonsListComponent } from './private-lessons-list/private-lessons-list.component';
import { PrivateLessonsDetailsComponent } from './private-lessons-details/private-lessons-details.component';
import { FooterComponent } from './footer/footer.component';
import { AuthenticationComponent } from './authentication/authentication.component';

import {TimeslotService} from './services/timeslot.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HeroComponent,
    SchedulerComponent,
    PrivateLessonsComponent,
    PrivateLessonsListComponent,
    PrivateLessonsDetailsComponent,
    FooterComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    MyDatePickerModule,
    routing
  ],
  providers: [TimeslotService],
  bootstrap: [AppComponent]
})
export class AppModule { }




