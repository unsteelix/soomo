import React from 'react';

import './studentsDynamic.scss';

interface IStudentsDynamic {
  /** number of students to improve, negative - down red, positive - up green */
  students: number;
}

/**
 * show how students are doing compare to last week
 */
class StudentsDynamic extends React.Component<IStudentsDynamic> {
  /**
   * get correct message for component
   */
  private _getMessage = () => {
    const students = Math.abs(this.props.students);
    const behavior = this.props.students > 0 ? 'improved' : 'worsen';

    return `Nice work! ${students} of the students you contacted last week — ${behavior}.`;
  };

  /** render v-dom */
  public render() {
    const className = `${this.props.students > 0 ? 'studentsDynamic-up' : 'studentsDynamic-down'}`;

    return (
      <div className="studentsDynamic">
        <div className={className}>{this._getMessage()}</div>
      </div>
    );
  }
}

export default StudentsDynamic;
