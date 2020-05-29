// tslint:disable:no-magic-numbers
import React from 'react';
import ChartistGraph from 'react-chartist';

import './graph.scss';
import LegendLabel from './LegendLabel';
import { IBarChartOptions } from 'chartist';

interface IGraphProps {
  /** array of students progress */
  data: number[][];
}

/**
 * Graph with vertical nested bars
 */
class Graph extends React.Component<IGraphProps> {
  constructor(props: any) {
    super(props);
    // const chartistGraphEl: any = null;
  }

  /** ref for graph */
  private scroller = React.createRef<HTMLDivElement>();

  /** scroll graph to left */
  private _handleLeftClick = () => {
    const refGraph = this.scroller.current;

    if (refGraph) {
      refGraph.scrollLeft -= 80;
    }
  };

  /** scroll graph to right */
  private _handleRightClick = () => {
    const refGraph = this.scroller.current;

    if (refGraph) {
      refGraph.scrollLeft += 80;
    }
  };

  private chartistGraphEl: any = null;

  public componentDidMount() {
    // внутренний объект с графиком chartist
    const chart = this.chartistGraphEl.chartist;
    const countBar = this.chartistGraphEl.props.data.labels.length;

    // Offset x1 a tiny amount so that the straight stroke gets a bounding box
    // Straight lines don't get a bounding box
    // Last remark on -> http://www.w3.org/TR/SVG11/coords.html#ObjectBoundingBox
    chart.on('draw', function(ctx: any) {
      if (ctx.type === 'bar') {
        ctx.element.attr({
          x1: ctx.x1 + 0.001,
        });
      }
    });

    // Create the gradient definition on created event (always after chart re-render)   #F15887  #FE9B86         #14D2B8  #72F7C5
    chart.on('created', function(ctx: any) {
      const defs = ctx.svg.elem('defs');

      // создаем элемент-градиент верхней части бара (красный)
      defs
        .elem('linearGradient', {
          id: 'gradient',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0,
        })
        .elem('stop', {
          offset: 0,
          'stop-color': '#FE9B86',
        })
        .parent()
        .elem('stop', {
          offset: 1,
          'stop-color': '#F15887',
        });

      // создаем элемент-градиент нижней части бара (зеленый)
      defs
        .elem('linearGradient', {
          id: 'gradient2',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0,
        })
        .elem('stop', {
          offset: 0,
          'stop-color': '#72F7C5',
        })
        .parent()
        .elem('stop', {
          offset: 1,
          'stop-color': '#14D2B8',
        });

      // calculate width of the bar
      let width = 40;

      if (countBar < 12) {
        width = 50;
      }

      const lines = document.getElementsByClassName('ct-bar');

      for (let i = 0; i < lines.length; i++) {
        lines[i].setAttribute('style', 'stroke-width: ' + width + 'px;');
      }
    });
  }

  /** render v-dom */
  public render() {
    const countWeek = this.props.data[0].length;
    const labels: any[] = [];

    for (let i = 1; i <= countWeek; i++) {
      labels.push(i);
    }
    const biPolarBarChartData = {
      labels,
      series: this.props.data,
    };

    const biPolarBarChartOptions: IBarChartOptions = {
      width: '100%',
      stackBars: true,
      onlyInteger: true,
      axisY: {
        offset: 60,
        scaleMinSpace: 60,
        labelOffset: {
          x: -10,
          y: 10,
        },
      },
      axisX: {
        labelOffset: {
          x: 0,
          y: 10,
        },
      },
    };

    return (
      <div className="graph-container">
        <div className="default-padding graph-area-container">
          <div className="graph-scroll-button-left" onClick={this._handleLeftClick} />
          <div className="graph-scroll" ref={this.scroller}>
            <div id="content" className="graph">
              <ChartistGraph
                data={biPolarBarChartData}
                options={biPolarBarChartOptions}
                type={'Bar'}
                ref={(el) => (this.chartistGraphEl = el)}
              />
            </div>
          </div>
          <div className="graph-scroll-button-right" onClick={this._handleRightClick} />
        </div>
        <div className="graph-x-label">Week</div>
        <div className="graph-legend">
          <div>SHOWING:</div>
          <LegendLabel text="ON TRACK" className="green" />
          <LegendLabel text="OFF PATH" className="red" />
        </div>
      </div>
    );
  }
}

export default Graph;
