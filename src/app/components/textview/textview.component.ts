import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data/data.service";

@Component({
  selector: 'app-textview',
  templateUrl: './textview.component.html',
  styleUrls: ['./textview.component.css']
})
export class TextviewComponent implements OnInit {

  private parser;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {

    this.dataService.xmlToJSON('./assets/wisski_test.xml').then(function (result) {

      // --------------------------------------------
      // --------------------------------------------
      // --------------------------------------------
      // mit for()-Schleife durh das JSON Objekt,
      // sodass es an die beispiel.json angepasst ist und die component/graphview (für d3) damit arbeiten kann
      // --------------------------------------------
      // --------------------------------------------
      // --------------------------------------------

      // Konsole zeigt Objekte
      console.log(result["rdf:RDF"]["rdf:Description"]);

      // --------------------------------------------
      // --------------------------------------------
      // --------------------------------------------

      // Neues JSON-Objekt -- für d3-Funktionen
      var beispiel_json = {"prefixes":[],"nodes":[],"links":[]};
      console.log(beispiel_json);


      // --------------------------------------------
      // --------------------------------------------
      // --------------------------------------------
      // Inhalte aus 'result'-Objekt in d3_json_Format überführen
      // for() - Schleifen


      var node_id = 0;
      // var prefix_id = 0;
      var check = 1;

      let len = result["rdf:RDF"]["rdf:Description"].length;
      for (var i = 0; i < len; i++) {

        // :::::
        // NODES // LINKS (// PREFIXES)
        // :::::
        var node = {};
        var about = result["rdf:RDF"]["rdf:Description"][i];


        // Node -- $
        // ---------
        if (about["$"] != null){
          node["link"] = about["$"]["rdf:about"];
          node["name"] = about["$"]["rdf:about"];
          node["id"] = node_id;

          // Check if Node is already in Nodes
          beispiel_json.nodes[node_id] = node;
          node_id++;


          var node = {};
        }

        // ---------
        // Node -- originatesFrom
        // ---------
        if (about["originatesFrom"] != null){
          node["link"] = about["originatesFrom"]["$"]["xmlns"];
          node["name"] = about["originatesFrom"]["_"];
          node["id"] = node_id;
          beispiel_json.nodes[node_id] = node;
          node_id++;
          var node = {};
        }



      }

      // prefix["name"]='someValue';
      // prefix["id"]= 0.1;
      // beispiel_json.prefixes[0]=prefix;

      console.log(beispiel_json);


      // --------------------------------------------
      // --------------------------------------------
      // --------------------------------------------

      // Download
      // saveText( JSON.stringify(result), "filename.json" );

    }, function(error) {
    });

  }
}


// --------------------------------------------
// --------------------------------------------
// --------------------------------------------

function saveText(text, filename){
  var a = document.createElement('a');
  a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
  a.setAttribute('download', filename);
  a.click()
}

// function downloadObjectAsJson(exportObj, exportName){
//   var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
//   var downloadAnchorNode = document.createElement('a');
//   downloadAnchorNode.setAttribute("href",     dataStr);
//   downloadAnchorNode.setAttribute("download", exportName + ".json");
//   document.body.appendChild(downloadAnchorNode); // required for firefox
//   downloadAnchorNode.click();
//   downloadAnchorNode.remove();
// }
