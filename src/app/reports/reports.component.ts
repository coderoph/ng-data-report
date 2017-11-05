
import { Component, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { CsvService } from "angular2-json2csv";
import { Options } from './../options';
@Component({
  selector: 'ng-data-report',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  inputs      : ['options'],
})
export class ReportsComponent implements OnInit
{
  perPageSelector:any = [10,25,50,75,100,150,200,300,500];
  options:Options = {
    currentPage : 0,
    rowPerPage  : 25,
    totalRows   : 0,
    keyword     : '',
    download    : true,
    maximize    : false
  }

  lastPage:number     = 0;
  lastIndex:number    = 0;
  firstIndex:number   = 0;

  onSearch            = new EventEmitter<Options>();
  onPaginate          = new EventEmitter<Options>();

  constructor(private elementRef: ElementRef, private csv : CsvService) 
  {
  }

  paginate(type:string = '')
  {
    let current = this.options.currentPage;

    switch(type)
    {
      case 'first':
        current = 1;
      break;

      case 'last':
        current = this.lastPage;
      break;

      case 'next':
        current += 1;
      break;

      case 'prev':
        current -= 1;
      break;
    }

    this.options.currentPage = current;
  }

  ngOnChanges()
  {
    this.lastPage   = Math.ceil(this.options.totalRows / this.options.rowPerPage);
    let findex      = this.options.rowPerPage * (this.options.currentPage - 1);
    let maxIndex    = this.options.currentPage * this.options.rowPerPage;
    this.firstIndex = this.options.totalRows ? findex + 1 : findex;
    this.lastIndex  = maxIndex >= this.options.totalRows ? this.options.totalRows : maxIndex;
  }

  toggleMaximize()
  {
    this.options.maximize = !this.options.maximize;
    let element   = this.elementRef.nativeElement;
    if(this.options.maximize)
      element.classList.add('maximize');
    else
      element.classList.remove('maximize');
  }

  download()
  {
    let parent      = this.elementRef.nativeElement.querySelector('mat-card-content table');
    let header      = parent.querySelector('thead tr');
    let headerNodes = header.children;
    let thead       = [];

    let body        = parent.querySelector('tbody');
    let bodyNodes   = body.children;

    for(let i = 0; i < headerNodes.length; i++)
    {
      let isSortable = headerNodes[i].hasAttribute('mat-sort-header');

      if(isSortable)
        thead.push(headerNodes[i].querySelector('button').textContent.trim());
      else
        thead.push(headerNodes[i].textContent.trim());

    }
      
    let tbody = [];
    for(let x = 0; x < bodyNodes.length; x++)
    {

      let rows      = bodyNodes[x];
      let rowsNodes = rows.children;
      let column    = {};
      for(let a = 0; a < rowsNodes.length; a++)
      {
        if(!rowsNodes[a].classList.contains('mat-icon-cell'))
        {
          let text = rowsNodes[a].textContent.replace(/\n/g, ' ');
          column[thead[a]] = text.replace(/\s{2,}/g, ' ');
        }
      }
    
      tbody.push(column);
    }

    this.csv.download(tbody, new Date()+' - CSV Report');
  }

  ngOnInit() {
  }
}
