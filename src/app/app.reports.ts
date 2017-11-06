import { NgModule , NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports/reports.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CsvService } from "angular2-json2csv";

import { MatIconModule, MatCardModule, MatToolbarModule, MatMenuModule, MatTooltipModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatSelectModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule
  ],
  declarations: [
    ReportsComponent
  ],
  providers :[CsvService],
  exports: [ReportsComponent],
  schemas : [ NO_ERRORS_SCHEMA ],
  
})
export class NgDataReportModule { }
