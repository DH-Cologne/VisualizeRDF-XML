import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Parser} from 'xml2js';

@Component({
  selector: 'app-textview',
  templateUrl: './textview.component.html',
  styleUrls: ['./textview.component.css']
})
export class TextviewComponent implements OnInit {

  private parser;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {

    this.parser = new Parser();

    this.http.get('./assets/wisski_test.xml', {responseType: 'text'})
      .subscribe(data => {

        this.parser.parseString(data, function (err, result) {

          console.log(JSON.stringify(result));
          console.log(result);
        }, function(err) {
          console.log(err);
        });

      });

    console.log(this.parser);
  }

}
