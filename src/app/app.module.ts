import { NgModule , NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, Injectable} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgDataReportModule } from './app.reports';
import { HttpModule } from '@angular/http';
import 'hammerjs';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgDataReportModule,
    HttpModule
  ],
  exports : [NgDataReportModule],
  bootstrap : [AppComponent]
})
export class AppModule { }
