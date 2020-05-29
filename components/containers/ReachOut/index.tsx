import React from 'react';

import { connect } from 'react-redux';
import { IGlobalState } from 'src/types';
import getLocalState from 'src/app/selectors/getLocalState';
import { ISectionHistory } from 'src/app/types';

import './reachOut.scss';
import RiskCategory from 'src/components/containers/RiskCategory';
import { showPopup } from 'src/app/actions/actionCreators';
import { ActionCreator, AnyAction } from 'redux';
import HeaderWithSub from 'src/components/ui/HeaderWithSub';
import Bubble from 'src/components/ui/Bubble';

interface IReachOutStateProps {
  /** list of loaded history */
  userData: ISectionHistory;
  students: any;
  sectionSelected: number;
}

interface IReachOutDispatchProps {
  /** show popup actionCreator */
  showPopup: ActionCreator<AnyAction>;
}

/**
 * Dropdown with aftertext
 */
class ReachOut extends React.Component<IReachOutStateProps & IReachOutDispatchProps> {
  /** show popup on small screens
   */
  private _showFacultyGuildPopup = () => {
    this.props.showPopup();
  };

  private _getRiskCategory = () => {
    let res = null;
    const sectionSelected = this.props.sectionSelected;
    const userData = this.props.userData;

    // histories exist
    if (sectionSelected in userData) {
      const riskCategory = userData[sectionSelected].riskCategory;

      res = riskCategory;
    }

    return res;
  };

  private _getRiskNumberByCategory = (category: string) => {
    let res = 0;
    const riskCategory = this._getRiskCategory();

    if (riskCategory) {
      res = riskCategory[category].length;
    }
    return res;
  };

  /** render v-dom */
  public render() {
    return (
      <div className="reachOut">
        <div className="default-padding">
          <HeaderWithSub title="Reach Out" sub="At-Risk Categories as of 12:01 am, March 18" />
          <div className="faculty-guide-button" onClick={this._showFacultyGuildPopup}>
            <label>Faculty Guide</label>
            <Bubble>i</Bubble>
          </div>
        </div>
        <RiskCategory
          categoryKey="stopped"
          name="No Log In Last Week"
          numberOfStudents={this._getRiskNumberByCategory('noLogInLastWeek')}
        />
        <RiskCategory
          categoryKey="low-completion"
          name="Missing Work"
          numberOfStudents={this._getRiskNumberByCategory('missingWork')}
        />
        <RiskCategory
          categoryKey="low-score"
          name="Low Score"
          numberOfStudents={this._getRiskNumberByCategory('lowScore')}
        />
      </div>
      // type category = 'stopped(no-sign-in-last-week)' | 'hasnt-started(Never signed in)' | 'low-completion' | 'low-score' | 'on-track';
    );
  }
}

export default connect(
  (state: IGlobalState) => {
    const localState = getLocalState(state);
    // console.log(localState)

    return {
      userData: localState.courseData.histories || 'No data',
      students: localState.courseData.studentsData.students,
      sectionSelected: localState.sectionSelected,
    };
  },
  {
    showPopup,
  }
)(ReachOut);
