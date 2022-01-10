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
  base_url = 'https://218.selfip.net/apps/2ix38yISAt/collections/Data/documents/'

  constructor(private http : HttpClient) {}

  get() : Observable<Report[]> {
    return this.http.get<any[]>(this.base_url)
      .pipe(
        map(data => {
          // transform json to Report Object
          let _reports : Report[] = [];
          for(var i = 0; i < data.length; i++){
            console.log(data[i]);
            let _data = data[i]['data'];
            let _data_reporter = _data['reporter'];
            let _data_location = _data['location'];
            let _data_visitDate : string = _data['visitedDate'];
            _data_visitDate = _data_visitDate.slice(0, -1);
            console.log(_data_visitDate);
            let _report = new Report(
              _data_reporter['name'],
              _data_reporter['phone_number'],
              _data_location['name'],
              parseFloat(_data_location['longitude']),
              parseFloat(_data_location['latitude']),
              new Date(_data_visitDate)
            );
            _report.id = data[i]['key'];
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

  getAddSubject(): Subject<any> {
    return this.addSubject;
  }

  retrivedRepoerById(reportId : String) : Observable<any>{
    let target_url = `${this.base_url}${reportId}/`;
    let _report : Report;
    return this.http.get<any>(target_url)
      .pipe(
        map(data => {
          // transform json to Report Object
          let _data = data['data'];
          let _data_reporter = _data['reporter'];
          let _data_location = _data['location'];
          let _data_visitDate : string = _data['visitedDate'];
          _data_visitDate = _data_visitDate.slice(0, -1);
          console.log(_data_visitDate);
          _report = new Report(
            _data_reporter['name'],
            _data_reporter['phone_number'],
            _data_location['name'],
            _data_location['longitude'],
            _data_location['latitude'],
            new Date(_data_visitDate)
          );
          _report.id = data['key'];
          console.log(_report);
          return _report;
          })
      );
  }

  add(newReport : Report) : Observable<Report> {
    this.reports.push(newReport);
    return this.http.post<Report>(this.base_url, {
      "key" : newReport.id,
      "data" : newReport
    });
  }

  delete(reportId : string) : Observable<Report>{
    // TODO
    // splice
    console.log("DELETE");
    let del_index = -1;
    for(var i = 0; i < this.reports.length; i++){
      if(this.reports[i].id == reportId){
        del_index = i;
        break;
      }
    }
   
    console.log(this.reports[del_index]);
    let del_target_url = `${this.base_url}${reportId}/`
    console.log(del_target_url);
    // this.http.delete(del_target_url).subscribe(
    //   () => this.reports.splice(del_index, 1)
    // )
    this.delete_index = del_index;
    // this.reports.splice(del_index, 1) // dangerous
    return this.http.delete<Report>(del_target_url);
  }
}
