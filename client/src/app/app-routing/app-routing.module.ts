import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { ReportFormComponent } from '../report-form/report-form.component';
import { ReportDetailComponent } from '../report-detail/report-detail.component';
import { ReporttableComponent } from '../reporttable/reporttable.component';

const appRoutes : Routes = [
  {path: 'add', component: ReportFormComponent},
  {path: 'view/:reportId', component: ReportDetailComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
