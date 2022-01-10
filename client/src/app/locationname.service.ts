import { Injectable } from '@angular/core';
import { Observable, pipe, Subject,  } from 'rxjs';
import { HttpClient } from '@angular/common/http'

const name = [
  "burnaby",
  "metrotown",
  "vancouver",
  'surrey'
]

const lat = [
  "49.2488",
  "49.2276",
  "49.2827",
  "49.1913"
]

const lon = [
  "-122.9805",
  "-123.0076",
  "-123.1207",
  "-122.8490"
]


@Injectable({
  providedIn: 'root'
})
export class LocationnameService {

  base_url = 'http://localhost:8080/locations';

  locations? : string[];

  constructor(private http : HttpClient) {}

  get() : Observable<any[]>{
    return this.http.get<any[]>(this.base_url);
  }

  add(locationname : string, _lat : number, _lon : number) : Observable<any>{
    console.log("====add location service ======");

    const newLocation = {
      name: locationname,
      latitude: _lat,
      longitude: _lon
    };
    
    console.log(typeof _lat == 'number');
    return this.http.post<any>(`${this.base_url}/add`, newLocation);
  }

  init(){
    console.log("====init location service ======");

    // for(var i = 0; i < 5; i++){
    //   var _lat = lat[i];
    //   var _lon = lon[i];

    //   this.add(
    //     name[i],
    //     _lat,
    //     _lon
    //   ).subscribe(
    //     () => console.log("success")
    //   )
    // }
  }
}
