// /<reference types = "@types/googlemap"/>

import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { Report } from 'src/model/Report';
import { ReportServiceService } from './report-service.service';

import { icon, Marker} from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
}); 
Marker.prototype.options.icon = iconDefault;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'COVID19-tracker';
  private map : any;
  reports: Report[] = [];

  markerHashMap = new Map<string, Marker>();
  countHashMap = new Map<string, number>();

  constructor(private rs : ReportServiceService){
  }

  ngOnInit(){
    console.log("====== here =========")
    this.rs.get().subscribe(
      (reports) => {
        this.reports = reports;

        for(let i = 0; i < this.reports.length; i++){
          
          var latlon_key = reports[i].location.latitude + '-' + reports[i].location.longitude;
          // no marker at this coordinate

          console.log("Innerlooop", latlon_key);
          console.log(reports[i]);
          if(!this.countHashMap.has(latlon_key)){
            // create marker and add it to map
            console.log("------- first case =======");
            console.log("add marker at " + reports[i].location.latitude + " " + reports[i].location.longitude);
            var marker = L.marker([reports[i].location.latitude, reports[i].location.longitude])
            marker.addTo(this.map);
            // coordinate -> marker
            this.markerHashMap.set(latlon_key, marker);
            // coordinate -> count of 1
            this.countHashMap.set(latlon_key, 1);
          }else{
            // already marker exists 
            // update count
            console.log("------- second case =======");
            var curCount = this.countHashMap.get(latlon_key);
            this.countHashMap.set(latlon_key, curCount! + 1);
          }
        }

        for (const [key, value] of this.markerHashMap.entries()) {
          const marker = value;
          const count = this.countHashMap.get(key);
          marker.bindPopup(`<b>${count}</b> cases<br/>reported`);
        }
        console.log(this.countHashMap);
        console.log(this.markerHashMap);
      }
    );

    this.rs.getRemoveSubject().subscribe(
      (data) => {
        console.log("========= subject remove =========");
        var latlon_key = data.location.latitude + '-' + data.location.longitude;
        var curCount = this.countHashMap.get(latlon_key);

        // this is the last report at this coord so remove marker and markerHashmap
        if(curCount == 1){
          var deleteMarker = this.markerHashMap.get(latlon_key);
          this.map.removeLayer(deleteMarker);
          this.markerHashMap.delete(latlon_key);
        }

        this.countHashMap.set(latlon_key, curCount!-1);
        curCount! -= 1;
        console.log(this.countHashMap);
        console.log(this.markerHashMap);

        // update count
        const marker = this.markerHashMap.get(latlon_key);
        marker?.bindPopup(`<b>${curCount}</b> cases<br/>reported`)
      }
    )

    this.rs.getAddSubject().subscribe(
      (report) => {
        console.log("========= subject add =========");
        console.log(report);
        
        var _lat : number = report.location.latitude;
        var _lon : number = report.location.longitude;
        var latlon_key = _lat + '-' + _lon;
        console.log(latlon_key);
        var curCount;
        // no marker at this coord -> create marker
        if(!this.markerHashMap.has(latlon_key)){
          console.log("----------first case");
          curCount = 0;
          console.log(curCount);
          var newMarker = L.marker([_lat, _lon]);
          newMarker.addTo(this.map);
          this.markerHashMap.set(latlon_key, newMarker);
          this.countHashMap.set(latlon_key, 1);
        }else{
          console.log("----------second case");
          
          // already marker exists at this coord -> just increment count
          curCount = this.countHashMap.get(latlon_key);
          console.log(curCount);
          this.countHashMap.set(latlon_key, curCount!+1);
        }
        curCount! += 1;
        console.log(curCount);
        console.log(this.countHashMap);
        console.log(this.markerHashMap);
        // update count
        const marker = this.markerHashMap.get(latlon_key);
        marker?.bindPopup(`<b>${curCount}</b> cases<br/>reported`)
      
      }
    )

  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
    this.map = L.map('mapid').setView([49.2, -123], 11);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2hpc2giLCJhIjoiY2tuazRyYnUyMDZodTJvbW83bXF4bHBjYSJ9.WBx1XFUdiT-pnFvbHx6SAQ', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);

    for(let i = 0; i < this.reports.length; i++){
      console.log("add marker at " + this.reports[i].location.latitude + " " + this.reports[i].location.longitude);
      L.marker([this.reports[i].location.latitude, this.reports[i].location.longitude]).addTo(this.map);
    }

    // L.marker([49.2276, -123.0076]).addTo(this.map) <latitude, longitude>
    // .bindPopup.openPopup();

    // L.marker([49.1867, -122.8490]).addTo(this.map)
    // .bindPopup("<b>SFU Surrey</b><br />cases reported.").openPopup();

  };
  
}
