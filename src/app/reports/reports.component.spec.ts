import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule , NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, Injectable} from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CsvService } from "angular2-json2csv";
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatCardModule, MatToolbarModule, MatMenuModule, MatTooltipModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatSelectModule } from '@angular/material';
import { ReportsComponent } from './reports.component';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsComponent ],
      schemas : [NO_ERRORS_SCHEMA],
      providers : [CsvService],
      imports : [
        FormsModule, ReactiveFormsModule,
        BrowserAnimationsModule, NoopAnimationsModule,
        MatIconModule, MatCardModule, MatToolbarModule, MatMenuModule, MatTooltipModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatSelectModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
