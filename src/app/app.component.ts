import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HtmService } from './htm.service.service';
import { HighlightTag } from 'angular-text-input-highlight';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'scrapper';
  data: string;
  elem = [];
  @ViewChild('newEl',{static: true}) newEl: ElementRef;

  constructor(private http: HttpClient, private htmlService: HtmService) {

    this.htmlService.htmlData.subscribe((response: string) => {

      // this.data = response;
      this.newEl.nativeElement.innerHTML = response;

      var div = document.createElement('div');
      div.innerHTML = response;
      var all = div.getElementsByTagName("*");
      for (var i = 0, max = all.length; i < max; i++) {       
        var tagname = all[i].tagName;
        if (this.elem.indexOf(tagname) == -1) {
         this.elem.push(tagname);
        }
      }   
    });
  }
  onSubmit(value: string){
    console.log(value );
    const data = {
      url: value
    }
    this.htmlService.sendUrl(data);
  }
   highlight(text) {
    //  this.tags = []
     console.log('item to be searched! ', text);
    
    var inputText = this.newEl.nativeElement;
    var innerHTML = this.data;
    var index = innerHTML.indexOf(text.toLowerCase());
    if (index >= 0) { 
      this.newEl.nativeElement.innerHTML = this.newEl.nativeElement.innerHTML.substring(-1,index) + "<span class='highlight'>" + this.newEl.nativeElement.innerHTML.substring(index,index+text.length) + "</span>" + this.newEl.nativeElement.innerHTML.substring(index + text.length);
    }
  }
}