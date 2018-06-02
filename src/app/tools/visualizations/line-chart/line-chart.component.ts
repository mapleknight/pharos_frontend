import {
  Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output,
  ViewChild, ViewEncapsulation
} from '@angular/core';
import * as d3 from 'd3';
import {BehaviorSubject} from 'rxjs/index';

export interface PharosPoint {
  name?: string;
  label?: string;
  key: number;
  value: number;
}

// todo: https://bl.ocks.org/lorenzopub/6a56e17551d59278631dffd7f65a0cda

@Component({
  selector: 'pharos-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LineChartComponent  implements OnInit {
  @ViewChild('lineChartTarget') chartContainer: ElementRef;

  private _data: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  @Input()
  set data(value: any) {
    this._data.next(value);
  }
  get data(): any { return this._data.value; }

  @Input() line = true;

  private margin: any = {top: 20, bottom: 20, left: 20, right: 20};
  height: number;
  width: number;
  svg: any;
  tooltip: any;
  @Output() readonly clickSlice: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  // todo add click event that emits up
  // todo - data change doesnt update the chart, it just redraws it;
  // todo - revamp this to be more in line with es6
  ngOnInit() {
    this.drawGraph();
    this._data.subscribe(x => {
      if (this.data) {
            this.updateGraph();
      }
    });
  }

/*  @HostListener('window:resize', ['$event'])
  onResize() {
    this.svg.select('pharos-line-chart svg').remove();
    this.drawGraph();
    this.updateGraph();
  }*/

  drawGraph(): void {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    this.svg = d3.select(element).append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .append('g')
      .attr('class', 'line-container');

        // Add the X Axis
    this.svg.append('g')
      .attr('class', 'xaxis')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.height + ')');

    // Add the Y Axis
    this.svg.append('g')
      .attr('class', 'yaxis')
      .attr('transform', 'translate(20, 0)');

    this.svg.append('g')
      .attr('class', 'linePointHolder')
      .attr('transform', 'translate(20, 0)');

    // Add the valueline path.
    this.svg.append('path')
      .attr('class', 'timeline')
      .attr('transform', 'translate(' + this.margin.left + ',0)' )
      .style('filter' , 'url(#glow)');

    // Filter for the outside glow
    const filter = this.svg.append('defs').append('filter').attr('id', 'glow'),
      feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation', '2.5').attr('result', 'coloredBlur'),
      feMerge = filter.append('feMerge'),
      feMergeNode_1 = feMerge.append('feMergeNode').attr('in', 'coloredBlur'),
      feMergeNode_2 = feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    this.tooltip = d3.select('body').append('div')
      .attr('class', 'line-tooltip')
      .style('opacity', 0);

  }

  updateGraph(): void {

    const x = d3.scalePoint()
      .domain(this.data.map(d => +d.key))
      .rangeRound([0, this.width]);

    const y = d3.scaleLinear()
      .domain(d3.extent(this.data, (d) => d.value))
      .rangeRound([this.height, 0]);

    const line = d3.line()
      .x(function(d) { return x(+d.key); })
      .y(function(d) { return y(+d.value); });


    const xaxis = this.svg.select('.xaxis')
      .call(d3.axisBottom(x));

    this.svg.selectAll('.xaxis text')  // select all the text elements for the xaxis
      .attr('transform', function(d) {
        return 'translate(' + this.getBBox().height * -2 + ',' + this.getBBox().height + ')rotate(-45)';
      });

    this.svg.select('.yaxis')
      .call(d3.axisLeft(y));

    this.svg.select('.linePointHolder').selectAll('.linePoints')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('class', 'linePoints')
      .attr('r', 3)
      .attr('cx', d => x(+d.key))
      .attr('cy', d => y(+d.value))
      .style('fill', '#23364e')
      .style('fill-opacity', 0.8)
      .style('pointer-events', 'all');

    this.svg.select('.linePointHolder').selectAll('.invisibleCircle')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('class', 'invisibleCircle')
      .attr('r', 10)
      .attr('cx', d => x(+d.key))
      .attr('cy', d => y(+d.value))
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .on('mouseover', (d, i, circles) => {
        d3.select(circles[i]).classed('hovered', true);
        this.tooltip
          .transition()
          .duration(200)
          .style('opacity', .9);
        let span: string = "";
        if(d.label){
          span = '<span>' + d.label + ': <br>' + d.name + '</span>'
        } else {
         span = '<span>' + d.key + ': <br>' + d.value + '</span>'
        }
        this.tooltip.html(span)
          .style('left', d3.event.pageX + 'px')
          .style('top', d3.event.pageY + 'px')
          .style('width', 100);
      })
      .on('mouseout', (d, i, circles) => {
        this.tooltip
          .transition()
          .duration(200)
          .style('opacity', 0);
        d3.select(circles[i]).classed('hovered', false);
      });
if(this.line) {
  this.svg.select('.timeline')   // change the line
    .datum(this.data)
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('stroke', '#23364e')
    .attr('stroke-width', 2)
    .attr('fill', 'none')
    .attr('d', line);
}
  }
}



