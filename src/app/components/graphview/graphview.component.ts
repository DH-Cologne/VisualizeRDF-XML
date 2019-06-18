import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import { D3SimulationService } from '../../services/d3Simulation/d3-simulation.service';

@Component({
  selector: 'app-graphview',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './graphview.component.html',
  styleUrls: ['./graphview.component.css']
})
export class GraphviewComponent implements OnInit {

  constructor(private d3SimulationService: D3SimulationService) {
  }

  ngOnInit() {
    this.d3SimulationService.createD3Simulation();
  }

}
