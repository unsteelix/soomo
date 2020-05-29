import React from 'react';

import './facultyGuide.scss';
import FacultyGuideCard from './FacultyGuideCard';

/**
 * Faculty Guide helper
 */
class FacultyGuide extends React.Component {
  /** render v-dom */
  public render() {
    return (
      <div className="facultyGuide">
        {/* allow to grow bottom block up if cards > 2 */}
        <div className="facultyGuide-topEmptyBlock" />
        <div className="facultyGuide-cards">
          <div className="facultyGuide-title">Faculty Guide</div>
          <FacultyGuideCard title="STEP ONE">
            Students who don’t engage with the work very rarely succeed. And the best way to get them moving is personal
            outreach from a caring human. Click on each of the categories here to send individual messages to these
            students who are clearly off-track.
          </FacultyGuideCard>
          <FacultyGuideCard title="STEP TWO">
            Stay in touch. Students want to hear from you regularly. In this category, we’ve pulled together a list of
            the students who are on-track but haven’t heard from you (as far as we know) in the past two weeks. Send a
            quick message to say hi.
          </FacultyGuideCard>
        </div>
      </div>
    );
  }
}

export default FacultyGuide;
