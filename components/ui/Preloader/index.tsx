import React from 'react';
import Spinner from 'react-bootstrap/es/Spinner';

import './preloader.scss';

export default () => {
  return (
    <div className="preloader">
      <Spinner animation="border" role="status" />
    </div>
  );
};
