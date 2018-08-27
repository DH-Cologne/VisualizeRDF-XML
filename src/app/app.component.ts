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

      var node_id = 0;

      // JSON --- d3
      var beispiel_json = {"prefixes":[],"nodes":[],"links":[]};


      // -------------------------------------------------------------------------------------------
      // ---------------------------------------V1--------------------------------------------------
      // -------------------------------------------------------------------------------------------

      // Keylist
      // var keylist = [];  
      // var result_B = result;
      // keylist.push(Object.keys(result_B));       
      // var i=0;

      // if (keylist[i]){
      //   result_B = result[keylist[i]];
      //   console.log(result_B);
      //   keylist.push(Object.keys(result_B));
      //   console.log(keylist);
      // }


      // // ["$", "rdf:Description"]
      // var a=1;
      // // "$"
      // var b=0;
      // if (keylist[a][b]) {
      // result_B = result_B[keylist[a][b]];
      //   console.log(result_B);
      //   keylist.push(Object.keys(result_B));
      //   console.log(keylist);  
      // }
      // // "rdf:Description"
      // b=1;
      // result_B = result;
      // result_B = result_B[keylist[i]];
      // if (keylist[a][b]) {
      //   result_B = result_B[keylist[a][b]];
      //     console.log(result_B);
      //     keylist.push(Object.keys(result_B));
      //     console.log(keylist);  
      //   }


      // -------------------------------------------------------------------------------------------
      // ---------------------------------------V2--------------------------------------------------
      // -------------------------------------------------------------------------------------------

      // Keylist
      // var general_Keylist =[];

      // result["rdf:RDF"]["rdf:Description"].forEach(about => { 

      //   var keylist = [];  
      //   var result_B = result["rdf:RDF"]["rdf:Description"];
      //   keylist.push(Object.keys(about));       
      //   general_Keylist.push(keylist);
        
      //   console.log(about);
      //   // console.log(keylist);
      // });

      // for (var i=0; i <general_Keylist.length; i++){
      //   console.log(general_Keylist[i]);
      // }

      


      // -------------------------------------------------------------------------------------------
      // ---------------------------------------V3--------------------------------------------------
      // -------------------------------------------------------------------------------------------

      result["rdf:RDF"]["rdf:Description"].forEach(about => {
        
        var sourceID;
        var typeID;

      

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
          console.log(sourceID);
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
        link["target"] = targetID;
        link["type"] = typeID;
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
      link["target"] = targetID;
      link["type"] = typeID;
      beispiel_json.links.push(link);
    }
    
  }
}