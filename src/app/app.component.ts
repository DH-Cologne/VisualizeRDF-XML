import { Component, OnInit } from '@angular/core';
import { DataService } from "./services/data/data.service";
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
      const d3Json = { "prefixes": [], "nodes": [], "links": [] };
      // --------------------------------------------------------------------------------------------
      // Keylist automatisieren...
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
      keysNodeLink.push(["$", "xmlns"]);
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
        // search trought all keys 
        for (let i = 0; i < keys.length; i++) {
          if (about[keys[i]] != null) {
            if (about[keys[i]] instanceof Array) {
              for (let l = 0; l < about[keys[i]].length; l++) {

                let node = {};
                // Node_link
                node["link"] = about[keys[i]][l];
                for (let j = 0; j < keysNodeLink[i].length; j++) {
                  node["link"] = node["link"][keysNodeLink[i][j]];
                }
                // Node_name
                node["name"] = about[keys[i]][l];
                for (let j = 0; j < keysNodeName[i].length; j++) {
                  node["name"] = node["name"][keysNodeName[i][j]];
                }

                // ADD NODE
                // if node already exists
                let check = 1;
                d3Json.nodes.map(d3Node => {
                  if (d3Node["name"] == node["name"]) {
                    check = 0;
                    node = d3Node;
                  }
                })
                // if node does not exist
                if (check) {
                  node["id"] = node_id;
                  d3Json.nodes[node_id] = node;
                  node_id++;
                }
                // sourceID
                if (keys[i] == "$") {
                  sourceID = node["id"];
                }
                // ADD LINK
                addLinks(node, sourceID, d3Json, keys[i]);
              }
            }
            // if about[keys[i]] no Array
            else {

              let node = {};
              // Node_link
              node["link"] = about[keys[i]];
              for (let j = 0; j < keysNodeLink[i].length; j++) {
                node["link"] = node["link"][keysNodeLink[i][j]];
              }
              // Node_name
              node["name"] = about[keys[i]];
              for (let k = 0; k < keysNodeName[i].length; k++) {
                node["name"] = node["name"][keysNodeName[i][k]];
              }
                // ADD NODE
                // if node already exists
                let check = 1;
                d3Json.nodes.map(d3Node => {
                  if (d3Node["name"] == node["name"]) {
                    check = 0;
                    node = d3Node;
                  }
                })
                // if node does not exist
                if (check) {
                  node["id"] = node_id;
                  d3Json.nodes[node_id] = node;
                  node_id++;
                }
                // sourceID
                if (keys[i] == "$") {
                  sourceID = node["id"];
                }
                // ADD LINK  
                addLinks(node, sourceID, d3Json, keys[i]);
            }
          }
        }
      });
      console.log(d3Json);
    }, function (error) {
    });
  }
}


function addLinks(node, sourceID, d3Json, key) {

  let typeID = key;
  if (typeID != "$") {
    let targetID;
    targetID = node["id"];
    const link = {};
    link["source"] = sourceID;
    link["target"] = targetID;
    link["type"] = typeID;
    d3Json.links.push(link);
  }
}