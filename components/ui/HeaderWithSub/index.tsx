import React from 'react';

import './headerWithSub.scss';

interface IHeaderWithSub {
  /** title */
  title: string;
  /** text under title  */
  sub: string;
  /** size of header */
  size?: 'large' | 'medium';
}

const HeaderWithSub: React.FunctionComponent<IHeaderWithSub> = ({ title, sub, size }) => {
  return (
    <div className={`soomo-headerWithSub soomo-headerWithSub-${size}`}>
      <div className="soomo-headerWithSub-header">
        <h2>{title}</h2>
      </div>
      <div className="soomo-headerWithSub-sub">{sub}</div>
    </div>
  );
};

HeaderWithSub.defaultProps = {
  size: 'large', // This value is adopted when name prop is omitted.
};

export default HeaderWithSub;
