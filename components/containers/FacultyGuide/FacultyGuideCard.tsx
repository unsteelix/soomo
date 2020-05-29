import React from 'react';

import './facultyGuide.scss';

interface IFacultyGuideCard {
  /** card title */
  title: string;
}

/**
 * Faculty Guide helper
 */
class FacultyGuideCard extends React.Component<IFacultyGuideCard> {
  /** render v-dom */
  public render() {
    return (
      <div className="facultyGuideCard">
        <div className="facultyGuideCard-title">{this.props.title}</div>
        <div className="facultyGuideCard-content">{this.props.children}</div>
      </div>
    );
  }
}

export default FacultyGuideCard;
