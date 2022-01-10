import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { MatSliderModule } from '@angular/material/slider';

import { AppComponent } from './app.component';
import { ReporttableComponent } from './reporttable/reporttable.component';
import { ReportRowComponent } from './report-row/report-row.component';
import { ReportFormComponent } from './report-form/report-form.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    AppComponent,
    ReporttableComponent,
    ReportRowComponent,
    ReportFormComponent,
    ReportDetailComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatSliderModule,
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
