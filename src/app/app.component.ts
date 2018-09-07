import {Component, OnInit} from '@angular/core';
import {DataService} from "./services/data/data.service";
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private dataService: DataService) {
  }

  ngOnInit() {

    this.dataService.xmlToJSON('./assets/wisski_test.xml').then(function (result) {

      let node_id = 0;
      // JSON --- d3
      const d3Json = {"prefixes":[],"nodes":[],"links":[]};
      

      // --------------------------------------------------------------------------------------------
      // noch die Keylist automatisieren...
      let keys = [];
      keys.push("$");
      keys.push("originatesFrom");
      keys.push("owl:sameAs");
      keys.push("rdf:type");
      keys.push("ecrm:P3_has_note");
      keys.push("ecrm:P87_is_identified_by");
      keys.push("ecrm:P7_took_place_at");
      keys.push("ecrm:P90_has_value");

      let keysNodeLink = [];
      keysNodeLink.push(["rdf:about"]);
      keysNodeLink.push(["$","xmlns"]);
      keysNodeLink.push(["$", "rdf:resource"]);
      keysNodeLink.push(["$", "rdf:resource"]);
      keysNodeLink.push([]);
      keysNodeLink.push(["$", "rdf:resource"]);
      keysNodeLink.push(["$", "rdf:resource"]);
      keysNodeLink.push([]);
      
      let keysNodeName = [];
      keysNodeName.push(["rdf:about"]);
      keysNodeName.push(["_"]);
      keysNodeName.push(["$", "rdf:resource"]);
      keysNodeName.push(["$", "rdf:resource"]);
      keysNodeName.push([]);
      keysNodeName.push(["$", "rdf:resource"]);
      keysNodeName.push(["$", "rdf:resource"]);
      keysNodeName.push([]);

      // --------------------------------------------------------------------------------------------
      const content = result["rdf:RDF"]["rdf:Description"];
      content.map(about => {

        let sourceID = 0;
        // IN GENERAL
        for (let i = 0; i < keys.length; i++){
          if (about[keys[i]] != null){
            if (about[keys[i]] instanceof Array) {
              for (let l = 0; l < about[keys[i]].length; l++){
                const node = {};
                // Node_link from KeyMap
                node["link"] = about[keys[i]][l];
                for (let j = 0; j < keysNodeLink[i].length; j++) {
                  node["link"] = node["link"][keysNodeLink[i][j]];  
                }
                // Node_name from KeyMap   
                node["name"] = about[keys[i]][l];
                for (let j = 0; j < keysNodeName[i].length; j++) {
                  node["name"] = node["name"][keysNodeName[i][j]];  
                }
                // variables for the link
                let typeID = keys[i];
                if (keys[i] == "$"){
                  sourceID = node_id;
                }
                // Check nodes + create node + create link
                const vergleichsNode = d3Json.nodes[node_id];
                checkDouble(node, d3Json, node_id, sourceID, typeID);
                if (vergleichsNode != d3Json.nodes[node_id]){
                  node_id++;
                }
              }
            } 
            else {
              const node = {};
               // Node_link aus KeyMap
              node["link"] = about[keys[i]];
              for (let j = 0; j <keysNodeLink[i].length; j++) {
                node["link"] = node["link"][keysNodeLink[i][j]];  
              }
              // Node_name aus KeyMap
              node["name"] = about[keys[i]];
              for (let k = 0; k <keysNodeName[i].length; k++){
                node["name"] = node["name"][keysNodeName[i][k]];  
              }
              // variables for the link
              let typeID = keys[i];
              if (keys[i] == "$"){
                sourceID = node_id;
              }
              // Check nodes + create node + create link
              const vergleichsNode = d3Json.nodes[node_id];
              checkDouble(node, d3Json, node_id, sourceID, typeID);
              if (vergleichsNode != d3Json.nodes[node_id]){
                node_id++;
              }
            }
          }
        }
      });   
    
      console.log(d3Json);

      // saveText( JSON.stringify(d3Json), "filename.json" );
      
    }, function(error) {
    });

  }
}

// --------------------------------------------
// Check if Node already in Nodes  + (if not) create node   + create link
function checkDouble (node, d3Json, node_id, sourceID, typeID) {

  let check = 1;
  d3Json.nodes.map(element => {
    if (element["name"] == node["name"]) {
      // Check if nodes exists
      check = 0;
      // LINK -- V1
      if (typeID != "$"){ 
        let targetID;
        targetID = element["id"];
        const link = {};
        link["source"] = sourceID;
        link["target"] = targetID;
        link["type"] = typeID;
        d3Json.links.push(link);
      }
    }
  })
  if (check) {
    node["id"] = node_id;
    d3Json.nodes[node_id] = node;
    // LINK -- V2
    if (typeID != "$"){ 
      let targetID;
      targetID = node["id"];
      const link = {};
      link["source"] = sourceID;
      link["target"] = targetID;
      link["type"] = typeID;
      d3Json.links.push(link);
    }
  }
}


// --------------------------------------------
// function saveText(text: string, filename: string) {
//   const a = document.createElement('a');
//   a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(text));
//   a.setAttribute('download', filename);
//   a.click()
// }
