import { Injectable } from '@angular/core';

// further views -- for their Data

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  public completeDataTableObject: Promise<any>;
  
  public DataTableVis1: Promise<any>;
  public DataTableVis2: Promise<any>;


  constructor() {
    // this.createDataTableObject();
  }

  // Push DataTable of Visualization in completeDataTableObject
  createDataTableObject(DataOfVis: Promise<any>){
    
    let completeDataTable;
    // create Complete DataTable 
            // 
            //     G-O-I
            //     OBJEKT -- ID_VIS_1 -- ID_VIS_2
            //     -------||----------||---------
            //     Pharao || xml-1p2h || rdf-1p2h
            //     Dish-1 || xml-1o1d || rdf-1o1d
            //     Vase-1 || xml-2o1v || rdf-2o1v
            //     Dish-2 || xml-2o2d || rdf-2o2d
            //     Event-x|| xml-1e1x || rdf-1e1x
    this.completeDataTableObject = completeDataTable;

  }

  // Create DataTable of Visualization 
  // extract Id's of vis-object
  // extract vis-Object-Id's connected global-Object-identifier (G-O-I)
  createDataTableVis(DataOfVis: Promise<any>){

    if(!this.DataTableVis1){
      this.createDataTableVis(this.DataTableVis1);
    }
    else if(!this.DataTableVis2){
      this.createDataTableVis(this.DataTableVis1);
    }
    else{
      this.createDataTableVis(this.DataTableVis1);
    }
  
  }

}