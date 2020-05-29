import React from 'react';

import './bubble.scss';

interface IBubbleProps {
  /** click handler */
  onClick?: () => void;
  /** content */
  children?: any;
}

export default (props: IBubbleProps) => {
  return <div className="soomo-bubble">{props.children}</div>;
};
