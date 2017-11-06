
import { Component, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { CsvService } from "angular2-json2csv";
import { Options } from './options';
@Component({
  selector    : 'ng-data-report',
  templateUrl : './reports.component.html',
  styleUrls   : ['./reports.component.css'],
  outputs     : ['onSearch', 'onPaginate'],
  inputs      : ['options', 'maximize', 'downloadable'],
  
})
export class ReportsComponent implements OnInit
{
  perPageSelector:any = [10,25,50,75,100,150,200,300,500];
  options:any;
  lastPage:number     = 0;
  keyword:string      = '';
  order:boolean       = true;
  maximizable:boolean = true;
  downloadable:boolean= true;
  maximize:boolean    = true;
  orderBy:string      = '';
  onSearch            = new EventEmitter<String>();
  onPaginate          = new EventEmitter<Options>();

  constructor(private elementRef: ElementRef, private csv : CsvService) 
  {
  }

  paginate(type:string = '')
  {
    let current = this.options.currentPage;
    let options = this.options;

    switch(type)
    {
      case 'first':
        current = 1;
      break;

      case 'last':
        current = Math.ceil(options.totalRows / options.rowPerPage);
      break;

      case 'next':
        current += 1;
      break;

      case 'prev':
        current -= 1;
      break;
    }

    this.options.currentPage = current;
    this.onPaginate.emit(this.options);
  }

  toggleMaximize()
  {
    this.maximize = !this.maximize;
    let element   = this.elementRef.nativeElement;
    if(this.maximize)
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

  getLastPage() {
    return Math.ceil(this.options.totalRows / this.options.rowPerPage);
  }

  ngOnChanges()
  {
    let element = this.elementRef.nativeElement;
    if(this.maximize) element.classList.add('maximize');

    if(this.options.keyword) this.keyword = this.options.keyword;
  }

  tableSorter()
  {
    let element   = this.elementRef.nativeElement.querySelector('table thead tr');
    let children  = element.children;
    let _this     = this;
    for (var i = 0; i < children.length; i++) {

      let isSortable  = children[i].hasAttribute('sort-by');
      
      if(isSortable)
      {
        let sortBy      = children[i].getAttribute("sort-by");
        this.order      = this.options.order && this.options.order.charAt(0) == '-' ? false : true;
        
        if(this.options.order)
        {
          let currentOrder = this.options.order;
          if(currentOrder.charAt(0) == '-') currentOrder = currentOrder.substring(1);
          if(currentOrder == sortBy) children[i].classList.add('active');
        }

        children[i].addEventListener('click', function()
        {
          for (var a = 0; a < children.length; a++) {
            children[a].classList.remove('active');
          }

          this.classList.add('active');
          _this.order = !_this.order;
          let by      = this.getAttribute("sort-by");


          _this.options.order = !_this.order ? '-'+by : by;
          _this.onPaginate.emit(_this.options);
        }, false);
      }
    }
  }

  ngOnInit() {
    this.tableSorter();
  }
}
