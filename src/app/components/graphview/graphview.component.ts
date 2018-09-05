import{ Component, OnInit, ViewEncapsulation } from '@angular/core';


// VORLAGE
// -------
// -------
// http://bl.ocks.org/fancellu/2c782394602a93921faff74e594d1bb1
// -------
// -------
// -------



import * as d3 from 'd3';

interface Node {
  id: string;
  group: number;
}

interface Link {
  source: string;
  target: string;
  value: number;
}

interface Graph {
  nodes: Node[];
  links: Link[];
}


@Component({
  selector: 'app-graphview',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './graphview.component.html',
  styleUrls: ['./graphview.component.css']
})
export class GraphviewComponent {
  ngOnInit() {
    console.log('D3.js version:', d3['version']);



    const color = d3.scaleOrdinal(d3.schemeCategory10);


    const svg = d3.select('svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    
    var node;
    var link;


    svg.append('defs').append('marker')
      .attr('id','arrowhead')
      .attr('viewBox','-0 -5 10 10')
      .attr('refX',13)
      .attr('refY',0)
      .attr('orient','auto')
      .attr('markerWidth',13)
      .attr('markerHeight',13)
      .attr('xoverflow','visible')
      .append('svg:path')
      .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
      .attr('fill', '#999')
      .style('stroke','none');


    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d: any) => d.id).distance(100).strength(2))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide(50));


    d3.json('assets/beispiel.json') 
    .then((data: any) => {
      update(data.links, data.nodes)});


      function update(links, nodes) {

        const link = svg.selectAll(".link")
          .data(links)
          .enter()
          .append("line")
          .attr("class", "link")
          .attr('marker-end','url(#arrowhead)')

        link.append("title")
          .text((d:any) => d.type);


        const edgepaths = svg.selectAll(".edgepath")
          .data(links)
          .enter()
          .append('path')
          .attr('class','edgepath')
          .attr('fill-opacity', 0)
          .attr('stroke-opacity', 0)
          .attr('id',(d:any,i:any) => 'edgepath' + i)
          .style("pointer-events", "none");

        const edgelabels = svg.selectAll(".edgelabel")
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

          node = svg
          .selectAll(".node")
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
            // .style("fill", (d:any, i:any) => color(i))
            .style("fill", (d:any, i:any) => color(d.prefix))
            .style("opacity", 5)

        node.append("title")
            .text( (d: any) => d.link);

        node.append("text")
            .attr("dy", -3)
            // .text((d:any) => d.name+":"+d.label);
            .text((d:any) => d.name);
            
        simulation
            .nodes(nodes)
            .on("tick", ticked);

        simulation.force<d3.ForceLink<any, any>>('link')
            .links(links);



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
    



    function dragstarted(d) {
      simulation.restart();
      // if (!d3.event.active) { simulation.alphaTarget(0.3).restart(); }
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      simulation.restart();
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    // function dragended(d) {
    //   if (!d3.event.active) { simulation.alphaTarget(0); }
    //   d.fx = null;
    //   d.fy = null;
    // }
  }
}
