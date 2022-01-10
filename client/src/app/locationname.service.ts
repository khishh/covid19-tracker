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

  base_url = 'https://218.selfip.net/apps/2ix38yISAt/collections/LocationNames_test3/documents/';
  
  

  locations? : string[];

  constructor(private http : HttpClient) {

  }

  get() : Observable<any[]>{
    return this.http.get<any[]>(this.base_url);
  }

  add(newLocation : string, _lat : string, _lon : string) : Observable<any>{
    console.log("====add location service ======");
    var latlng = {
      _lat, 
      _lon
    };
    
    console.log(typeof _lat == 'number');
    return this.http.post<any>(this.base_url, {
      "key" : newLocation,
      "data" : latlng
    });
  }

  init(){
    console.log("====init location service ======");

    for(var i = 0; i < 5; i++){
      var _lat = lat[i];
      var _lon = lon[i];

      this.add(
        name[i],
        _lat,
        _lon
      ).subscribe(
        () => console.log("success")
      )
    }
  }
}
