import { Component, OnInit, Input } from '@angular/core';
import { Report } from 'src/model/Report';
import { ReportServiceService } from '../report-service.service'

@Component({
  selector: 'tr[app-report-row]',
  templateUrl: './report-row.component.html',
  styleUrls: ['./report-row.component.css']
})
export class ReportRowComponent implements OnInit {

  @Input() report!: Report;

  constructor(private rs : ReportServiceService){
  }

  ngOnInit(): void {
    console.log(this.report);
    console.log(this.rs);
  }

  onRemoveClicked(){
    console.log("onRemoveClicked");
    this.rs.delete(this.report._id).subscribe(
      () => {
        console.log("==== after delete, ")
        this.rs.setDeletedObject();
      }
    )
  }

}
