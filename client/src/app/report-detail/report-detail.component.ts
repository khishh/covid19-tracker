import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Resolve } from '@angular/router';
import { Report } from 'src/model/Report';
import { ReportServiceService } from '../report-service.service';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit{

  reportId? : string;
  report?  : Report;

  constructor(private ar : ActivatedRoute, private rs : ReportServiceService) { 
    console.log("===== here==== ")
    ar.params.subscribe(val => {
      // put the code from `ngOnInit` here
      console.log("url changed");
      this.reportId = this.ar.snapshot.paramMap.get('reportId')!;
      console.log(this.reportId);
      // get the details with the help of service
      console.log(this.report);
      // this.report = this.rs.retrivedRepoerById(this.reportId);
      this.rs.retrivedRepoerById(this.reportId).subscribe(
        (data) => {
          this.clearDetail();
          this.report = data;
          console.log(this.report);
          this.updateDetails();
      }
    )
    console.log(this.report);
    });
  }

  ngOnInit(): void {
    console.log("===== report-detail-component==== ")
    // this.reportId = this.ar.snapshot.paramMap.get('reportId')!;
    // get the details with the help of service
  }

  updateDetails(){
    console.log(this.report!.location.name);
    (document.getElementById('location') as HTMLParagraphElement).innerHTML =  this.report!.location.name;
    (document.getElementById('name') as HTMLParagraphElement).innerHTML = this.report!.reporter.name;
    (document.getElementById('phonenumber') as HTMLParagraphElement).innerHTML = this.report!.reporter.phone_number;
    var _date = this.report?.visitedDate;
    var _str = _date!.toUTCString();
    (document.getElementById('date') as HTMLParagraphElement).innerHTML = _str;
  }

  clearDetail(){
    (document.getElementById('location') as HTMLParagraphElement).innerHTML = "";
    (document.getElementById('name') as HTMLParagraphElement).innerHTML = "";
    (document.getElementById('phonenumber') as HTMLParagraphElement).innerHTML = "";
    (document.getElementById('date') as HTMLParagraphElement).innerHTML = "";
  }


}

