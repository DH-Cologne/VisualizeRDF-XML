import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonToD3KeylistService {

  public myD3Keylist: Promise<any>;

  constructor() { }

  
  public createKeylist(result) {

    console.log(result);
    console.log(result["rdf:RDF"]["rdf:Description"]);

    const content = result["rdf:RDF"]["rdf:Description"];

    let keylist = [];  
    let raw1 = [];
    let raw2 = [];
    let raw3 = [];
    
    // add keylist[] --- level-1
    // -------------------------
    content.map(object => {
  
      Object.keys(object).map(key1 => {
  
        this.addKeyToKeylist(key1, raw1);
      });
    });
    keylist.push(raw1);
  
  
    // add keylist[][] --- level-2
    // -------------------------
    let x1 = 0;
    content.map(object => {
  
      Object.keys(object).map(key1 => {
  
        if (raw1[x1] == key1) {
   
          let raw2_1 = [];
          Object.keys(object[key1]).map(key2 => {
            
            this.addKeyToKeylist(key2, raw2_1);
          });
  
          if(raw2_1[0] == "0") {
            
            // IF ARRAY-0
            let bla = Object.keys(object[key1][raw2_1[0]]);
            
            if (bla[0] == "0") {
              
              raw2.push(null);  
            }
            else {
  
              raw2.push(bla);
            }
          }
          else {
  
            raw2.push(raw2_1);
          }
  
          x1++;
        } 
      });
    });
    keylist.push(raw2);
  
  
    // add keylist[][][] --- level-3
    // ---------------------------
    let x2 = 0;
    content.map(object => {
  
      Object.keys(object).map(key1 => {
  
        if (raw1[x2] == key1) {
  
          let raw3_1 = [];
  
          Object.keys(object[key1]).map(key2 => {
              
              let raw3_2 = [];
              Object.keys(object[key1][key2]).map(key3 =>{
  
                // DEBUG
                // -------
                if (key3 == "$") {
                  Object.keys(object[key1][key2][key3]).map(key4 =>{
                    this.addKeyToKeylist(key4, raw3_2);
                  });
                }
                else {
                  this.addKeyToKeylist(key3, raw3_2);
                }
                // -------
              });
  
              if(raw3_2[0] == "0") {
  
                raw3_1.push(null); 
              }
              else {
      
                raw3_1.push(raw3_2);
              }
          });
  
          if(raw3_1[0] == "0") {
  
            raw3.push(null);  
          }
          else {
  
            raw3.push(raw3_1);
          }
          x2++;
        } 
      });
    });
    keylist.push(raw3);
  
    return keylist;
  }
  
  // ADD ONE KEY TO CHOSEN KEYLIST_ARRAY
  addKeyToKeylist(key, keylist){
  
    // check if "key" already in keylist
    for (let i = 0; i < keylist.length; i++) {
  
      if (key == keylist[i]) {
  
        // return if so
        return;
      }
    }
    // if not add key to keylist
    keylist.push(key);
  }
  


}
