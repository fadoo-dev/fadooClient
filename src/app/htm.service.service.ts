import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HtmService {
  htmlData =  new EventEmitter<string>()


  constructor(private http: HttpClient) { }

   sendUrl(data: { url: string}){
    //  console.log('sending!', {data});
    console.log(data);
    this.http.post('https://stark-retreat-88726.herokuapp.com/html', data)
    .subscribe((response: any) => {
      this.htmlData.emit(response.clean);
    });
  }
}