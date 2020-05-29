import React from 'react';

import './studentProgress.scss';

interface IStudentProgress {
  /** progress by weeks */
  data: boolean[];
}

const StudentProgress: React.FunctionComponent<IStudentProgress> = ({ data }) => {
  return (
    <div className={`soomo-studentProgress`}>
      {data.map((isProgress, i) => {
        return <div className={`soomo-studentProgress-block block-${isProgress}`} key={i} data-index={i + 1} />;
      })}
    </div>
  );
};

export default StudentProgress;
