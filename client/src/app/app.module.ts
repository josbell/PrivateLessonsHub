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
import { PrivateLessonsListComponent } from './private-lessons-list/private-lessons-list.component';
import { PrivateLessonsDetailsComponent } from './private-lessons-details/private-lessons-details.component';
import { FooterComponent } from './footer/footer.component';
import { CallbackComponent} from './callback/callback.component';

import {TimeslotService} from './services/timeslot.service';
import {AuthService} from './services/auth.service';
import { AdminComponent } from './admin/admin.component';

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
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    MyDatePickerModule,
    routing
  ],
  providers: [TimeslotService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule { }





