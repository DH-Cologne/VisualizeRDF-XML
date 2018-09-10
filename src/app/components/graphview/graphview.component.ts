import{ Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

import {AppComponent} from '../../app.component';

// Help:
// https://bl.ocks.org/puzzler10/4438752bb93f45dc5ad5214efaa12e4a

@Component({
  selector: 'app-graphview',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './graphview.component.html',
  styleUrls: ['./graphview.component.css']
})
export class GraphviewComponent {

  constructor(private appComponent: AppComponent) {
  }
  
  ngOnInit() {

    // prepare <svg> for d3
    const svg = d3.select("svg"),
          width = +svg.attr("width"),
          height = +svg.attr("height"),
          color = d3.scaleOrdinal(d3.schemeCategory10);

    // d3 Simulation
    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d: any) => d.id).distance(100).strength(2))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide(100));

    //add encompassing group for the zoom 
    const g = svg.append("g")
      .attr("class", "everything");

    // read JSON-Data
    d3.json('assets/beispiel.json') 
    .then((data: any) => {
      update(data.links, data.nodes, svg)
    });

    // Update Nodes and Links
    function update(links, nodes, svg) {

      const link = g.selectAll(".link")
        .data(links)
        .enter()
        .append("line")
        .attr("class", "link")
        .attr('marker-end','url(#arrowhead)')

      link.append("title")
        .text((d:any) => d.type);

      const edgepaths = g.selectAll(".edgepath")
        .data(links)
        .enter()
        .append('path')
        .attr('class','edgepath')
        .attr('fill-opacity', 0)
        .attr('stroke-opacity', 0)
        .attr('id',(d:any,i:any) => 'edgepath' + i)
        .style("pointer-events", "none");

      const edgelabels = g.selectAll(".edgelabel")
        .data(links)
        .enter()
        .append('text')
        .style("pointer-events", "none")
        .attr('class', 'edgelabel')
        .attr('id',(d:any,i:any) => 'edgelabel' + i)
        .attr('font-size', 10)
        .attr('fill', '#aaa');

      edgelabels.append('textPath')
        .attr('xlink:href', (d:any, i:any) => '#edgepath' + i)
        .style("text-anchor", "middle")
        .style("pointer-events", "none")
        .attr("startOffset", "50%")
        .text((d:any) => d.type);

      const node = g.selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                //.on("end", dragended)
        );

      node.append("circle")
          .attr("r", 10)
          .style("fill", (d:any, i:any) => color (d.prefix))
          .style("opacity", 5)
      node.append("title")
          .text( (d: any) => d.link);
      node.append("text")
          .attr("dy", -3)
          .text( (d:any) => d.name);

      simulation
          .nodes(nodes)
          .on("tick", ticked);
      simulation.force<d3.ForceLink<any, any>>('link')
          .links(links);

      //add zoom capabilities 
      const zoom_handler = d3.zoom()
        .on("zoom", zoom_actions);
      zoom_handler(svg);    

      // tick function
      function ticked() {
        link
          .attr('x1', (d: any) =>  d.source.x)
          .attr('y1', (d: any) => d.source.y)
          .attr('x2', (d: any) => d.target.x)
          .attr('y2', (d: any) => d.target.y);
        node  
          .attr("transform", (d: any) => "translate(" + d.x + ", " + d.y + ")");
        edgepaths.attr('d', (d: any) => 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y);
        // simulation.stop();
        }
    }

    //zoom functions 
    function zoom_actions(){
      g.attr("transform", d3.event.transform)
    }

    function dragstarted(d) {
      simulation.restart();
      d.fx = d.x;
      d.fy = d.y;
    }
  
    function dragged(d) {
      simulation.restart();
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

  }
}
