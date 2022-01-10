import { Injectable, OnInit } from '@angular/core';
import { Report } from '../model/Report'
import { HttpClient } from '@angular/common/http'
import { Observable, pipe, Subject,  } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService{

  reports!: Report[];
  removeSubject : Subject<Report> = new Subject();
  addSubject : Subject<Report> = new Subject();
  deletedReport? : Report;
  delete_index : number = -1;
  base_url = 'http://localhost:8080/reports'

  constructor(private http : HttpClient) {}

  get() : Observable<Report[]> {
    return this.http.get<any[]>(this.base_url)
      .pipe(
        map(data => {
          // transform json to Report Object
          console.log(data);
          
          let _reports : Report[] = [];
          for(var i = 0; i < data.length; i++){
            let _data = data[i];
            console.log(data[i]);
            let _data_visitDate : string = _data.visitedDate;
            _data_visitDate = _data_visitDate.slice(0, -1);
            console.log(_data_visitDate);
            let _report = new Report(
              _data._id,
              _data.reporterName,
              _data.reporterPhoneNumber,
              _data.locationName,
              _data.longitude,
              _data.latitude,
              new Date(_data_visitDate)
            );
            console.log(_report);
            _reports.push(_report);
          }
          this.reports = _reports;
          console.log(this.reports);
          return this.reports;
        })
      );
  }

  get2() : Report[]{
    return this.reports;
  }

  setAddedObject(newReport : Report){
    console.log('setAddedObject');
    console.log("length is " + this.reports.length)
    console.log(newReport);

    this.reports.push(newReport);
    
    this.addSubject.next(newReport);
  }

  setDeletedObject(){
    console.log("setDeletedObject");
    let deletedReport : Report = this.reports[this.delete_index];
    console.log(deletedReport);
    this.reports.splice(this.delete_index, 1)
    this.removeSubject.next(deletedReport);
  }

  getRemoveSubject(): Subject<Report>{
    return this.removeSubject;
  }

  getAddSubject(): Subject<Report> {
    return this.addSubject;
  }

  retrivedRepoerById(reportId : String) : Observable<any>{
    let target_url = `${this.base_url}/${reportId}`;
    let _report : Report;
    return this.http.get<any>(target_url)
      .pipe(
        map(data => {
          let _data_visitDate : string = data.visitedDate;
          _data_visitDate = _data_visitDate.slice(0, -1);
          console.log(_data_visitDate);
          _report = new Report(
            data._id,
            data.reporterName,
            data.reporterPhoneNumber,
            data.locationName,
            data.longitude,
            data.latitude,
            new Date(_data_visitDate)
          );
          console.log(_report);
          return _report;
          })
      );
  }

  add(newReport : any) : Observable<any> {
    console.log(newReport);
    
    return this.http.post<any>(`${this.base_url}/add`, newReport);
  }

  delete(reportId : string) : Observable<Report>{
    // TODO
    // splice
    console.log("DELETE");
    let del_index = -1;
    for(var i = 0; i < this.reports.length; i++){
      if(this.reports[i]._id == reportId){
        del_index = i;
        break;
      }
    }
   
    console.log(this.reports[del_index]);
    let del_target_url = `${this.base_url}/${reportId}/`
    console.log(del_target_url);
    // this.http.delete(del_target_url).subscribe(
    //   () => this.reports.splice(del_index, 1)
    // )
    this.delete_index = del_index;
    // this.reports.splice(del_index, 1) // dangerous
    return this.http.delete<Report>(del_target_url);
  }
}
