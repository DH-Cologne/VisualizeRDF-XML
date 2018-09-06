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

      const node_id = 0;

      // JSON --- d3
      const beispiel_json = {"prefixes":[],"nodes":[],"links":[]};


      // ---------------------------------------V2--------------------------------------------------
      // Keylist
      const general_Keylist =[];

      result["rdf:RDF"]["rdf:Description"].forEach(about => { 
        console.log(about);        

        const keylist = [];  
        keylist.push(Object.keys(about));
        
        for (let i=0; i < keylist[0].length; i++){
            keylist.push(Object.keys(about[keylist[0][i]]));
        }
        console.log(keylist);
        general_Keylist.push(keylist);
      });
      console.log(general_Keylist);

      

      


      // -------------------------------------------------------------------------------------------
      // ---------------------------------------V3--------------------------------------------------
      // -------------------------------------------------------------------------------------------

      // result["rdf:RDF"]["rdf:Description"].forEach(about => {
        
      //   const sourceID;
      //   const typeID;

      

      //   // Nodes
      //   // 
      //   // 
      //   // $
      //   // 
      //   if (about["$"] != null){
      //     const node = {};
      //     node["link"] = about["$"]["rdf:about"];
      //     node["name"] = about["$"]["rdf:about"];
          
      //     // Check
      //     const y = beispiel_json.nodes[node_id];
      //     // + LINK
      //     typeID = "$";
      //     sourceID = node_id;
      //     console.log(sourceID);
      //     checkDouble(node, beispiel_json, node_id, sourceID, typeID);

      //     if (y != beispiel_json.nodes[node_id]){
      //       node_id++;
      //     }
      //   }
      //   // 
      //   // originatesFrom
      //   // 
      //   if (about["originatesFrom"] != null){
      //     const node = {};
      //     node["link"] = about["originatesFrom"]["$"]["xmlns"];
      //     node["name"] = about["originatesFrom"]["_"];
          
      //     // Check
      //     const y = beispiel_json.nodes[node_id];
      //     // + LINK
      //     typeID = "originatesFrom";
      //     checkDouble(node, beispiel_json, node_id, sourceID, typeID);
          
      //     if (y != beispiel_json.nodes[node_id]){

      //       node_id++;
      //     }
      //   }
      //   // 
      //   // owl:sameAs (((sometimes Array)))
      //   // 
      //   if (about["owl:sameAs"] != null){
      //     if (about["owl:sameAs"] instanceof Array) {
      //       for (const i=0; i < about["owl:sameAs"].length; i++){
      //         // console.log(about["owl:sameAs"][i]);
      //         const node = {};
      //         node["link"] = about["owl:sameAs"][i]["$"]["rdf:resource"];
      //         node["name"] = about["owl:sameAs"][i]["$"]["rdf:resource"];
              
      //         // Check
      //         const y = beispiel_json.nodes[node_id];
      //         // + LINK
      //         typeID = "owl:sameAs";
      //         checkDouble(node, beispiel_json, node_id, sourceID, typeID);

      //         if (y != beispiel_json.nodes[node_id]){
      //           node_id++;
      //         }
      //       }
      //     } 
      //     else {
      //       const node = {};
      //       node["link"] = about["owl:sameAs"]["$"]["rdf:resource"];
      //       node["name"] = about["owl:sameAs"]["$"]["rdf:resource"];
      //       // Check
      //       const y = beispiel_json.nodes[node_id];
      //       // + LINK
      //       typeID = "owl:sameAs";
      //       checkDouble(node, beispiel_json, node_id, sourceID, typeID);

      //       if (y != beispiel_json.nodes[node_id]){
      //         node_id++;
      //       }
      //     }
      //   }
      //   // 
      //   // rdf:type (((sometimes Array)))
      //   // 
      //   if (about["rdf:type"] != null){
      //     if (about["rdf:type"] instanceof Array) {
      //       for (const i=0; i < about["rdf:type"].length; i++){
      //         const node = {};
      //         node["link"] = about["rdf:type"][i]["$"]["rdf:resource"];
      //         node["name"] = about["rdf:type"][i]["$"]["rdf:resource"];                  

      //         // Check
      //         const y = beispiel_json.nodes[node_id];
      //         // + LINK
      //         typeID = "rdf:type";
      //         checkDouble(node, beispiel_json, node_id, sourceID, typeID);

      //         if (y != beispiel_json.nodes[node_id]){
      //           node_id++;
      //         }
      //       }
      //     } 
      //     else {
      //       const node = {};
      //       node["link"] = about["rdf:type"]["$"]["rdf:resource"];
      //       node["name"] = about["rdf:type"]["$"]["rdf:resource"];
            
      //       // Check
      //       const y = beispiel_json.nodes[node_id];
      //       // + LINK
      //       typeID = "rdf:type";
      //       checkDouble(node, beispiel_json, node_id, sourceID, typeID);
            
      //       if (y != beispiel_json.nodes[node_id]){
      //         node_id++;
      //       }
      //     }
      //   }
      //   // 
      //   // ecrm:P3_has_note
      //   // 
      //   if (about["ecrm:P3_has_note"] != null){
      //     const node = {};
      //     node["link"] = about["ecrm:P3_has_note"];
      //     node["name"] = about["ecrm:P3_has_note"];

      //     // Check
      //     const y = beispiel_json.nodes[node_id];
      //     // + LINK
      //     typeID = "ecrm:P3_has_note";
      //     checkDouble(node, beispiel_json, node_id, sourceID, typeID);
          
      //     if (y != beispiel_json.nodes[node_id]){
      //       node_id++;
      //     }
      //   }
      //   // 
      //   // ecrm:P87_is_identified_by
      //   // 
      //   if (about["ecrm:P87_is_identified_by"] != null){
      //     const node = {};
      //     node["link"] = about["ecrm:P87_is_identified_by"]["$"]["rdf:resource"];
      //     node["name"] = about["ecrm:P87_is_identified_by"]["$"]["rdf:resource"];

      //     // Check
      //     const y = beispiel_json.nodes[node_id];
      //     // + LINK
      //     typeID = "ecrm:P87_is_identified_by";
      //     checkDouble(node, beispiel_json, node_id, sourceID, typeID);

      //     if (y != beispiel_json.nodes[node_id]){
      //       node_id++;
      //     }
      //   }
      //   // 
      //   // ecrm:P7_took_place_at
      //   // 
      //   if (about["ecrm:P7_took_place_at"] != null){
      //     const node = {};
      //     node["link"] = about["ecrm:P7_took_place_at"]["$"]["rdf:resource"];
      //     node["name"] = about["ecrm:P7_took_place_at"]["$"]["rdf:resource"];

      //     // Check
      //     const y = beispiel_json.nodes[node_id];
      //     // + LINK
      //     typeID = "ecrm:P7_took_place_at";
      //     checkDouble(node, beispiel_json, node_id, sourceID, typeID);
          
      //     if (y != beispiel_json.nodes[node_id]){
      //       node_id++;
      //     }
      //   }
      //   // 
      //   // ecrm:P90_has_value
      //   // 
      //   if (about["ecrm:P90_has_value"] != null){
      //     const node = {};
      //     node["link"] = about["ecrm:P90_has_value"];
      //     node["name"] = about["ecrm:P90_has_value"];
          
      //     // Check
      //     const y = beispiel_json.nodes[node_id];
      //     // + LINK
      //     typeID = "ecrm:P90_has_value";
      //     checkDouble(node, beispiel_json, node_id, sourceID, typeID);
          
      //     if (y != beispiel_json.nodes[node_id]){
      //       node_id++;
      //     }
      //   }
        



      // });

            
      // console.log(beispiel_json);
          



      // --------------------------------------------
      // --------------------------------------------
      // --------------------------------------------
      
      // Download 
      // saveText( JSON.stringify(beispiel_json), "filename.json" );
      


      
    }, function(error) {
    });

  }

}



// --------------------------------------------
function saveText(text: string, filename: string) {
  const a = document.createElement('a');
  a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
  a.setAttribute('download', filename);
  a.click()
}


// --------------------------------------------
// Check -- if Node is already in Nodes
function checkDouble(node, beispiel_json, node_id, sourceID, typeID){
  
  node["id"] = node_id;


  let check = 1;
  beispiel_json.nodes.forEach(element => {
    if (element["name"] == node["name"]) {
      check = 0;

      // LINK -- V1
      if (typeID != "$"){ 
        let targetID;
        targetID = element["id"];
        const link = {};
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
      let targetID;
      targetID = node["id"];
      const link = {};
      link["source"] = sourceID;
      link["target"] = targetID;
      link["type"] = typeID;
      beispiel_json.links.push(link);
    }
    
  }
}