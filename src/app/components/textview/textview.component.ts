import {Component, OnInit} from '@angular/core';

import {AppComponent} from '../../app.component';

import * as d3 from 'd3';

import { DataTableService } from "../../services/dataTable/data-table.service";

@Component({
  selector: 'app-textview',
  templateUrl: './textview.component.html',
  styleUrls: ['./textview.component.css']
})
export class TextviewComponent implements OnInit {


  constructor(private appComponent: AppComponent, private completeDataTableService: DataTableService) {

  }

  ngOnInit(){

    // INITIALIZE AND FILL LOCAL-DATATABLE-OBJECT WITH GLOBAL-IDENTIFIER
    // ----------------------------------------
    // OBJEKTE MIT IDENTIFIER AUS HTML ELEMENTEN AUSLESEN
    let identifierObjects = document.querySelectorAll('a[global-Identifier]');
    // give XML-ID to Object depending on Identifier
    for (let i=0; i < identifierObjects.length; i++){

      // console.log(identifierObjects[i]);
      let globalId =  String(identifierObjects[i].getAttribute("global-Identifier")).split('-');
      let localID = "xml-" + globalId[globalId.length-1];
      identifierObjects[i].setAttribute("id", localID);



      // FILL GLOBAL-IDENTIFIER??
    }
  }



  // Function -- Zoom on Node 
  // Add function for Objects with Id's 
  // In XML - Html Tag <a>
  zoomOnNode(nodeId: any) {

    // get node-position by node-id 
    let b = (document.getElementById(nodeId) as any).getBBox();
    let matrix = (document.getElementById(nodeId) as any).getAttribute("transform").replace(/[^0-9\-.,]/g, '').split(',');
    matrix[0] =  Number(matrix[0]) + Number(b.x);
    matrix[1] =  Number(matrix[1]) + Number(b.y);

    let svg = document.getElementById('svg');    
    // update svg viewbox in html with node-position
    svg.setAttribute("viewBox", matrix[0] + " " + matrix[1] + " " + 690 + " " + 650);
    // update transform in html
    document.getElementById('everythingZoom').setAttribute("transform","translate("+ 345 +","+ 325 +") scale(1)");
   
    // update transform --zoom.transform-- in "svg" d3-selection
    let t = d3.zoomIdentity.translate(345, 325).scale(1);
    let zoom = d3.zoom();
    let svgD3 = d3.select("svg")
            .call(zoom.transform, t);
  }

  // Function -- NodeZoom for zoom on rdf-Visualization
  NodeZoom(event) {

    // declare witch node to zoom on by XML-Object-ID  
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    let id =  String(value).split('-');
    value = id[id.length-1];
    let targetNode = "rdf-" + String(value); 
    // set href to target-node-id
    target.setAttribute("href", "#" + targetNode)
    this.zoomOnNode(targetNode);
  }

}