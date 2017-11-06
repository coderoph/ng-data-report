# Material2 Design and Angular Data Report
[![npm version](https://badge.fury.io/js/ng-data-report.svg)](https://badge.fury.io/js/ng-data-report)

## Installation
```
npm install --save ng-data-report
```
## Usage
#### 1. Import `NgDataReportModule`

```ts
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { NgDataReportModule } from 'ng-data-report';

@NgModule({
    imports: [
        BrowserModule,
        NgDataReportModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

#### 2. HTML

```html
<ng-data-report [options]="options" (onSearch)="searchReport($event);" (onPaginate)="paginate($event);">
    <thead ng-report-header>
        <tr>
            <th sort-by="accounts.id">DATETIME</th>
            <th sort-by="accounts.aid">ACCOUNT ID</th>
            <th>ACCOUNT OWNER</th>
            <th>BUSINESS NAME</th>
            <th>ADDRESS</th>
            <th>STATUS</th>
            <th numeric>BALANCE</th>
        </tr>
    </thead>
    <tbody ng-report-rows>
        <tr *ngFor="let item of reports">
            <td>{{item.date_registered}}</td>
            <td>{{item.aid}}</td>
            <td>ACCOUNT OWNER</td>
            <td>BUSINESS NAME</td>
            <td>ADDRESS</td>
            <td>STATUS</td>
            <td numeric>BALANCE</td>
        </tr>
    </tbody>
</ng-data-report>
```
## API Reference


Soon...
