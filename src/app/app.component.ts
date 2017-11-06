import { Component} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

declare var window: any;
const API_PORT    = location.protocol == 'https:' ? 5433 : 5000;
const SOCKET_PORT = location.protocol == 'https:' ? 5434 : 5001;
const API_URL     = location.protocol+'//'+window.location.hostname+':'+API_PORT;
const SOCKET_URL  = location.protocol+'//'+window.location.hostname+':'+SOCKET_PORT;

@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.css'],
})
export class AppComponent 
{
  options: any = {
    order       : '-accounts.id',
    currentPage : 1,
    rowPerPage  : 25,
    totalRows   : 0
  }

  reports:any = [];

  constructor(public http : Http)
  {
    this.get();
  }

  get()
  {
    let headers     = new Headers();
    let token       = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWlkIjoiT1RHLTAwMDEiLCJyb2xlIjoidXNlciIsImZpcnN0X25hbWUiOiJGcmVkIEpyIiwibGFzdF9uYW1lIjoiTGFiYW5kYSIsInVzZXJuYW1lIjoiYWRtaW5pc3RyYXRvciIsImVtYWlsIjoiZnJlZEBjb2Rlcm8ucGgiLCJhZGRyZXNzIjoiVW5pdCBBLTEwNSBHL0YgSGlsbGNyZXN0IENvbmRvbWluaXVtIDE2MTYsIEUuIFJvZHJpZ3VleiBTci4gQXZlLiwgUXVlem9uIENpdHkiLCJzdGF0dXMiOiJhY3RpdmUiLCJpcF9hZGRyZXNzIjoiIiwicmVhZF9ub3RlIjoiMSIsImlwX2xvY2tlZCI6IiIsImxhc3RfbW9kaWZpZWQiOiIyMDE3LTExLTAzVDEwOjM5OjA1LjAwMFoiLCJkYXRlX3JlZ2lzdGVyZWQiOiIyMDE2LTEyLTMxVDE2OjAwOjAwLjAwMFoiLCJ1aWQiOjEsInBhcmVudF9haWQiOiJPVEctMDAwMSIsImFjY291bnRfdHlwZSI6ImFkbWluIiwiYnVzaW5lc3NfbmFtZSI6Ik9uZXRvZ28gRnJlZWRvbSBJbmMiLCJidXNpbmVzc19hZGRyZXNzIjoiVW5pdCBBLTEwNSBHL0YgSGlsbGNyZXN0IENvbmRvbWluaXVtIDE2MTYsIEUuIFJvZHJpZ3VleiBTci4gQXZlLiwgUXVlem9uIENpdHkiLCJidXNpbmVzc19jaXR5IjoiUXVlem9uIENpdHkiLCJidXNpbmVzc196aXBjb2RlIjoxMTk5LCJidXNpbmVzc19waG9uZSI6Iis2MyAwMiAyNDUtODgxMSIsImJ1c2luZXNzX21vYmlsZSI6IjA5MDc4OTQ1MTE4IiwiYnVzaW5lc3NfdGluIjoiIiwiYnJhbmNoX25hbWUiOiJPbmV0b2dvIE1haW4gQnJhbmNoIiwidXNlcl9saW1pdCI6LTEsInByb3ZpbmNlX2NvZGUiOjAsImNpdHlfY29kZSI6MCwibGF0aXR1ZGUiOjE0LjY0NzU5NTI4ODc0MTgxLCJsb25naXR1ZGUiOjEyMS4wMjgyNjE0MjMxMTA5NiwiZGF0ZV9leHBpcmVkIjoiMjAyNS0xMi0zMVQxNjowMDowMC4wMDBaIiwibm9uX2V4cGlyeSI6MSwiYmFsYW5jZSI6MjM0NDc3LjAxMzA1LCJhY2NvdW50X3N0YXR1cyI6ImFjdGl2ZSIsInByaXZpbGVnZXMiOnsidmlld0JyYW5jaCI6dHJ1ZSwiY3JlYXRlQnJhbmNoIjp0cnVlLCJlZGlCcmFuY2giOnRydWUsIm1hbnVhbERlYml0Ijp0cnVlLCJtYW51YWxDcmVkaXQiOnRydWUsImJheWFkQ2VudGVyIjp0cnVlLCJlY3BheSI6dHJ1ZSwibG9hZENlbnRyYWwiOnRydWUsInByb3ZpZGVyIjp0cnVlLCJiYW5rIjp0cnVlLCJnZW5lcmFsUmVwb3J0Ijp0cnVlLCJ0cmFuc2ZlckZ1bmRSZXBvcnQiOnRydWUsInByb3ZpZGVyUmVwb3J0Ijp0cnVlLCJiYW5rUmVwb3J0Ijp0cnVlLCJtYW51YWxGdW5kUmVwb3J0Ijp0cnVlLCJsb2FkQ2VudHJhbEFwaSI6dHJ1ZSwicmVxdWVzdEZ1bmQiOnRydWUsInRyaXBvcHRpb24iOnRydWUsImxvYWRDZW50cmFsRGVsZWFyIjp0cnVlLCJlY3BheURlbGVhciI6dHJ1ZSwiY29uZmlybVJlcXVlc3QiOnRydWUsInJlcXVlc3QiOnRydWUsIm1hbnVhbEZ1bmQiOnRydWUsIndpdGhkcmF3IjpmYWxzZSwicmVxdWVzdFJlcG9ydCI6dHJ1ZSwid2l0aGRyYXdSZXBvcnQiOmZhbHNlLCJ0cmFuc2ZlciI6dHJ1ZSwicmVnaXN0ZXJCYW5rIjp0cnVlLCJ0cmFuc2ZlclJlcG9ydCI6dHJ1ZSwibWFudWFsUmVwb3J0Ijp0cnVlLCJzdW1tYXJ5UmVwb3J0Ijp0cnVlLCJ1cGRhdGVCcmFuY2hTdGF0dXMiOnRydWUsInJlc2V0QnJhbmNoUGFzc3dvcmQiOnRydWUsImNvbmZpcm1CYW5rIjp0cnVlLCJiaWxsc3BheSI6dHJ1ZX0sInRva2VuX3R5cGUiOiJub3RpZmljYXRpb24gdG9rZW4iLCJpYXQiOjE1MDk5NTUzMDMsImV4cCI6MTUxMDIxNDUwM30.Eu2_xMEsLn5Qtda_Af4g4zV9AZ-02joQTPw3rMQav78";

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    this.http.get(API_URL+'/api/accounts/', {headers: headers})
    .map(res => res.json())
    .subscribe(res => {
      let result = res.result;
      if(res.status) this.reports = result.data;
      this.options.totalRows      = result.total;
    });
  }

  searchReport(keyword)
  {
    console.log(keyword);
  }

  paginate(e)
  {
    console.log(e);
  }
}
