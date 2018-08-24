import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data/data.service";

@Component({
  selector: 'app-textview',
  templateUrl: './textview.component.html',
  styleUrls: ['./textview.component.css']
})
export class TextviewComponent {

  private parser;

  constructor(private dataService: DataService) {
  }

  
}


