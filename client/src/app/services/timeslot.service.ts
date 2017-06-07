import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import "rxjs";

@Injectable()
export class TimeslotService {

  constructor(private _http:Http) { }

  getTimeslots(){
  	return this._http.get('/timeslots')
  		.map(data=> data.json())
  		.toPromise()
  }

  create(booking){
  	console.log("Server > POST '/booking")
  	return this._http.post('/booking',booking)
  		.map(data=> data.json())
  		.toPromise()
  			
  }

}
