import {Component, OnInit} from '@angular/core';

import {AppComponent} from '../../app.component';

import * as d3 from 'd3';
import { treemapBinary, zoom, svg, zoomIdentity } from 'd3';
import { concat } from 'rxjs/internal/observable/concat';

@Component({
  selector: 'app-textview',
  templateUrl: './textview.component.html',
  styleUrls: ['./textview.component.css']
})
export class TextviewComponent {

  constructor(private appComponent: AppComponent) {
  }

  // Zoom on Node
  zoomOnNode(node: any) {

    // get node-position by node-id 
    let b = (document.getElementById(node) as any).getBBox();
    let matrix = (document.getElementById(node) as any).getAttribute("transform").replace(/[^0-9\-.,]/g, '').split(',');
    matrix[0] =  Number(matrix[0]) + Number(b.x);
    matrix[1] =  Number(matrix[1]) + Number(b.y);
     

    let svg = document.getElementById('svg');    
    // update svg viewbox in html with node-position
    svg.setAttribute("viewBox", matrix[0] + " " + matrix[1] + " " + 690 + " " + 650);
    // update transform in html
    document.getElementById('everythingZoom').setAttribute("transform","translate("+ 345 +","+ 325 +") scale(1)");
   
    // update transform (zoom.transform) in "svg" d3-selection
    let t = d3.zoomIdentity.translate(345, 325).scale(1);
    let zoom = d3.zoom();
    let svgD3 = d3.select("svg")
            .call(zoom.transform, t);
  }
}