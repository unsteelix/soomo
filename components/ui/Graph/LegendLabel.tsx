import React from 'react';

import './graph.scss';

interface ILegendLabelProps {
  /** extra className */
  className: string;
  /** label */
  text: string;
}

/**
 * single legend label for graph
 */
class LegendLabel extends React.Component<ILegendLabelProps> {
  /** render v-dom */
  public render() {
    return <div className={`graph-legend-label ${this.props.className}`}>{this.props.text}</div>;
  }
}

export default LegendLabel;
