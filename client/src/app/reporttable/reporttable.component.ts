import { Component, OnInit, Input } from '@angular/core';
import { Report } from 'src/model/Report';
import { ReportServiceService } from '../report-service.service'

@Component({
  selector: 'app-reporttable',
  templateUrl: './reporttable.component.html',
  styleUrls: ['./reporttable.component.css']
})
export class ReporttableComponent implements OnInit {

  @Input() reports! : Report[];

  constructor(private rs : ReportServiceService) { }

  ngOnInit(): void {
    console.log(this.reports);
  }

  sortByLocatioName(){
    console.log(" sort clicked location name ");
    this.reports.sort(function(a,b){
      if(a.location.name.toLowerCase() < b.location.name.toLowerCase()){
        return -1;
      }else if(a.location.name.toLowerCase() > b.location.name.toLowerCase()){
        return 1;
      }else{
        return 0;
      }
    });
  }

  sortByUserName(){
    console.log(" sort clicked - username");
    this.reports.sort(function(a,b){
      if(a.reporter.name.toLowerCase() < b.reporter.name.toLowerCase()){
        return -1;
      }else if(a.reporter.name.toLowerCase() > b.reporter.name.toLowerCase()){
        return 1;
      }else{
        return 0;
      }
    });
  }

  sortByDate(){
    console.log(" sort clicked - date");
    this.reports.sort(function(a,b){
      if(a.visitedDate < b.visitedDate){
        return -1;
      }else if(a.visitedDate > b.visitedDate){
        return 1;
      }else{
        return 0;
      }
    });
  }
}
