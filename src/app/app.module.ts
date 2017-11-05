import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CsvService } from "angular2-json2csv";
import { MatIconModule, MatCardModule, MatToolbarModule, MatMenuModule, MatTooltipModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatSelectModule } from '@angular/material';
import { AppComponent } from './app.component';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
  exports: [
    ReportsComponent
  ],
  providers: [CsvService],
  bootstrap: [AppComponent]
})
export class NgDataReport { }
