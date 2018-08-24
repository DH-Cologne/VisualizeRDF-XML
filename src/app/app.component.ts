import {Component, OnInit} from '@angular/core';
import {DataService} from "./services/data/data.service";

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

 
      // mit for()-Schleife durh das JSON Objekt,
          // sodass es an die beispiel.json angepasst ist und die component/graphview (für d3) damit arbeiten kann          
          
          // --------------------------------------------
          // Konsole zeigt Objekte aus geladenem JSON Objekt
          console.log(result["rdf:RDF"]["rdf:Description"]);          
          
          // --------------------------------------------
          // Neues JSON-Objekt -- für d3-Funktionen
          var beispiel_json = {"prefixes":[],"nodes":[],"links":[]};
          console.log(beispiel_json);

          // --------------------------------------------
          // Inhalte aus 'result'-Objekt in d3_json_Format überführen
          // NODES // LINKS (// PREFIXES)
          var aboutA = result["rdf:RDF"]["rdf:Description"];
          var node_id = 0;


          aboutA.forEach(about => {
            
            

            // 
            // Links
            // 
            // beispiel_json.links
            var sourceID;
            var typeID;

            // 
            // Nodes
            // 
            // 
            // $
            // 
            if (about["$"] != null){
              var node = {};
              node["link"] = about["$"]["rdf:about"];
              node["name"] = about["$"]["rdf:about"];
              
              // Check
              var y = beispiel_json.nodes[node_id];
              // + LINK
              typeID = "$";
              sourceID = node_id;
              checkDouble(node, beispiel_json, node_id, sourceID, typeID);

              if (y != beispiel_json.nodes[node_id]){
                node_id++;
              }
            }
            // 
            // originatesFrom
            // 
            if (about["originatesFrom"] != null){
              var node = {};
              node["link"] = about["originatesFrom"]["$"]["xmlns"];
              node["name"] = about["originatesFrom"]["_"];
              
              // Check
              var y = beispiel_json.nodes[node_id];
              // + LINK
              typeID = "originatesFrom";
              checkDouble(node, beispiel_json, node_id, sourceID, typeID);
              
              if (y != beispiel_json.nodes[node_id]){

                node_id++;
              }
            }
            // 
            // owl:sameAs (((sometimes Array)))
            // 
            if (about["owl:sameAs"] != null){
              if (about["owl:sameAs"] instanceof Array) {
                for (var i=0; i < about["owl:sameAs"].length; i++){
                  // console.log(about["owl:sameAs"][i]);
                  var node = {};
                  node["link"] = about["owl:sameAs"][i]["$"]["rdf:resource"];
                  node["name"] = about["owl:sameAs"][i]["$"]["rdf:resource"];
                  
                  // Check
                  var y = beispiel_json.nodes[node_id];
                  // + LINK
                  typeID = "owl:sameAs";
                  checkDouble(node, beispiel_json, node_id, sourceID, typeID);

                  if (y != beispiel_json.nodes[node_id]){
                    node_id++;
                  }
                }
              } 
              else {
                var node = {};
                node["link"] = about["owl:sameAs"]["$"]["rdf:resource"];
                node["name"] = about["owl:sameAs"]["$"]["rdf:resource"];
                // Check
                var y = beispiel_json.nodes[node_id];
                // + LINK
                typeID = "owl:sameAs";
                checkDouble(node, beispiel_json, node_id, sourceID, typeID);

                if (y != beispiel_json.nodes[node_id]){
                  node_id++;
                }
              }
            }
            // 
            // rdf:type (((sometimes Array)))
            // 
            if (about["rdf:type"] != null){
              if (about["rdf:type"] instanceof Array) {
                for (var i=0; i < about["rdf:type"].length; i++){
                  var node = {};
                  node["link"] = about["rdf:type"][i]["$"]["rdf:resource"];
                  node["name"] = about["rdf:type"][i]["$"]["rdf:resource"];                  

                  // Check
                  var y = beispiel_json.nodes[node_id];
                  // + LINK
                  typeID = "rdf:type";
                  checkDouble(node, beispiel_json, node_id, sourceID, typeID);

                  if (y != beispiel_json.nodes[node_id]){
                    node_id++;
                  }
                }
              } 
              else {
                var node = {};
                node["link"] = about["rdf:type"]["$"]["rdf:resource"];
                node["name"] = about["rdf:type"]["$"]["rdf:resource"];
                
                // Check
                var y = beispiel_json.nodes[node_id];
                // + LINK
                typeID = "rdf:type";
                checkDouble(node, beispiel_json, node_id, sourceID, typeID);
                
                if (y != beispiel_json.nodes[node_id]){
                  node_id++;
                }
              }
            }
            // 
            // ecrm:P3_has_note
            // 
            if (about["ecrm:P3_has_note"] != null){
              var node = {};
              node["link"] = about["ecrm:P3_has_note"];
              node["name"] = about["ecrm:P3_has_note"];

              // Check
              var y = beispiel_json.nodes[node_id];
              // + LINK
              typeID = "ecrm:P3_has_note";
              checkDouble(node, beispiel_json, node_id, sourceID, typeID);
              
              if (y != beispiel_json.nodes[node_id]){
                node_id++;
              }
            }
            // 
            // ecrm:P87_is_identified_by
            // 
            if (about["ecrm:P87_is_identified_by"] != null){
              var node = {};
              node["link"] = about["ecrm:P87_is_identified_by"]["$"]["rdf:resource"];
              node["name"] = about["ecrm:P87_is_identified_by"]["$"]["rdf:resource"];

              // Check
              var y = beispiel_json.nodes[node_id];
              // + LINK
              typeID = "ecrm:P87_is_identified_by";
              checkDouble(node, beispiel_json, node_id, sourceID, typeID);

              if (y != beispiel_json.nodes[node_id]){
                node_id++;
              }
            }
            // 
            // ecrm:P7_took_place_at
            // 
            if (about["ecrm:P7_took_place_at"] != null){
              var node = {};
              node["link"] = about["ecrm:P7_took_place_at"]["$"]["rdf:resource"];
              node["name"] = about["ecrm:P7_took_place_at"]["$"]["rdf:resource"];

              // Check
              var y = beispiel_json.nodes[node_id];
              // + LINK
              typeID = "ecrm:P7_took_place_at";
              checkDouble(node, beispiel_json, node_id, sourceID, typeID);
              
              if (y != beispiel_json.nodes[node_id]){
                node_id++;
              }
            }
            // 
            // ecrm:P90_has_value
            // 
            if (about["ecrm:P90_has_value"] != null){
              var node = {};
              node["link"] = about["ecrm:P90_has_value"];
              node["name"] = about["ecrm:P90_has_value"];
              
              // Check
              var y = beispiel_json.nodes[node_id];
              // + LINK
              typeID = "ecrm:P90_has_value";
              checkDouble(node, beispiel_json, node_id, sourceID, typeID);
              
              if (y != beispiel_json.nodes[node_id]){
                node_id++;
              }
            }
            



          });

          
          console.log(beispiel_json);
        

          // --------------------------------------------
          // Download 
          // saveText( JSON.stringify(beispiel_json), "filename.json" );
          // --------------------------------------------


      
    }, function(error) {
    });

  }

}



// --------------------------------------------
function saveText(text, filename){
  var a = document.createElement('a');
  a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
  a.setAttribute('download', filename);
  a.click()
}


// --------------------------------------------
// Check -- if Node is already in Nodes
function checkDouble(node, beispiel_json, node_id, sourceID, typeID){
  node["id"] = node_id;
  var check = 1;
  beispiel_json.nodes.forEach(element => {
    if (element["name"] == node["name"]) {
      check = 0;

      // LINK -- V1
      if (typeID != "$"){ 
        var targetID;
        targetID = element["id"];
        var link = {};
        link["source"] = sourceID;
        console.log(sourceID);
        link["target"] = targetID;
        link["type"] = typeID;
        // console.log(link);
        beispiel_json.links.push(link);
      }

    }
  })
  if (check){
    beispiel_json.nodes[node_id] = node;
    
    // LINK -- V2
    if (typeID != "$"){ 
      var targetID;
      targetID = node["id"];
      var link = {};
      link["source"] = sourceID;
      // console.log(sourceID);
      link["target"] = targetID;
      link["type"] = typeID;
      // console.log(link);
      beispiel_json.links.push({link});
    }
    
    // console.log(node_id);
  }
}