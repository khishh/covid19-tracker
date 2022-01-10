import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { Report } from 'src/model/Report';
import { LocationnameService } from '../locationname.service';
import { ReportServiceService } from '../report-service.service';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit {

  form! : FormGroup;
  newReport? : any;

  names : string[] = [];
  lats : string[] = [];
  lons : string[] = [];

  createNew : boolean = false;
  saveNew : boolean = false;
  locationNew?: string = undefined;
  locationLat? : string = undefined;
  locationLon? : string = undefined;

  constructor(private rs : ReportServiceService, private router : Router, private ls : LocationnameService) { }

  ngOnInit(): void {
    console.log('ReportFormComponent onInit');
    
    this.ls.get().subscribe(
      (data) => {
        console.log(data);
        data.forEach(
          (_d) => {
            var name = _d.name;
            var lat = _d.latitude;
            var lon = _d.longitude;
            // console.log(name, lat, lon);
            this.names.push(name);
            this.lats.push(lat);
            this.lons.push(lon);
          }
        )
        console.log("form after");
        console.log(this.names, this.lats, this.lons);
      }
    )

    this.form = new FormGroup({
      location_name : new FormControl(''),
      reporter_name : new FormControl('', Validators.required),
      phone_number : new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
        ]
      )),
      longitude : new FormControl('', Validators.compose(
        [
          Validators.max(180),
          Validators.min(-180),
          Validators.required
        ]
      )),
      latitude : new FormControl('', Validators.compose(
        [
          Validators.max(180),
          Validators.min(-180),
          Validators.required
        ]
      )),
      date : new FormControl('', Validators.required),
      time : new FormControl('', Validators.required)
    })
  }

  onSubmit(formValue:any){
    console.log(formValue);
    console.log(formValue.location_name);

    if(this.locationNew != undefined){
      console.log("new location name == ", this.locationNew);
      formValue.location_name = this.locationNew;
      formValue.longitude = this.locationLon;
      formValue.latitude = this.locationLat;
    }
  
    let dateVisited: Date = this.transformDateFromInput(formValue.date, formValue.time);
    console.log(dateVisited);
    this.newReport = {
      reporterName: formValue.reporter_name,
      reporterPhoneNumber: formValue.phone_number,
      locationName: formValue.location_name,
      longitude: formValue.longitude,
      latitude: formValue.latitude,
      visitedDate: dateVisited
    };
    console.log("event emit");

    this.rs.add(this.newReport).subscribe(
      (data) => {
        console.log(data);
        console.log("length is " + this.rs.get2().length)
        this.rs.setAddedObject(new Report(
          data._id,
          data.reporterName,
          data.reporterPhoneNumber,
          data.locationName,
          data.longitude,
          data.latitude, 
          data.visitedDate
        ));
        this.router.navigate(['/'])
      }
    )

    
    if(this.saveNew){
      
      var _lat : number = Number(this.newReport.latitude);
      var _lon : number = Number(this.newReport.longitude);
      console.log(_lat + " " + _lon);
      
      this.ls.add(this.newReport.locationName, _lat,_lon)
        .subscribe(
          (data) => {
            console.log("added new location on server " + data);
          }
        )
    }
    
  }

  transformDateFromInput(date : String, time : String) : Date{
    let datetime_str = date + " " + time;
    return new Date(datetime_str);
  }

  dropdownChanged(event : Event){
    console.log("dropdown selected " + (event.target as HTMLSelectElement).selectedIndex);

    let selectedLocation : number = (event.target as HTMLSelectElement).selectedIndex;
    this.createNew = selectedLocation == 1 ? true : false;
    console.log(this.createNew);

    if(selectedLocation <= 1){
      console.log("toggle validator on");
      this.form.controls['latitude'].setValidators([Validators.max(180), Validators.min(-180), Validators.required]);
      this.form.controls['longitude'].setValidators([Validators.max(180), Validators.min(-180), Validators.required]);
      this.form.controls['location_name'].setValidators([Validators.required]);
      this.locationNew = undefined;
    }else{
      console.log("toggle validator off");
      this.form.controls['latitude'].setValidators([Validators.max(180), Validators.min(-180)]);
      this.form.controls['longitude'].setValidators([Validators.max(180), Validators.min(-180)]);
      this.locationNew = this.names[selectedLocation-2];
      this.locationLat = this.lats[selectedLocation-2];
      this.locationLon = this.lons[selectedLocation-2];
      console.log(this.createNew, this.locationLat, this.locationLon);
      this.form.controls['location_name'].setValidators([]);

    }
    this.form.controls['latitude'].updateValueAndValidity();
    this.form.controls['longitude'].updateValueAndValidity();

    // console.log((document.getElementById('latitude') as HTMLInputElement).value);
    if(selectedLocation <= 1){
      (document.getElementById('latitude') as HTMLInputElement).value = "";
      (document.getElementById('longitude') as HTMLInputElement).value = '';
      return;
    }
    (document.getElementById('latitude') as HTMLInputElement).value = this.lats[selectedLocation-2];
    (document.getElementById('longitude') as HTMLInputElement).value = this.lons[selectedLocation-2];
  }

  toggleSave(){
    console.log("toggleSave", this.saveNew);
    this.saveNew = !this.saveNew;
  }
}
