import React from 'react';

import './riskCategory.scss';
import Collapse from 'react-bootstrap/es/Collapse';
import { connect } from 'react-redux';
import RiskCategoryStudentsTable from './RiskCategoryStudentsTable';
import getLocalState from 'src/app/selectors/getLocalState';
import { IGlobalState } from 'src/types';
import { selectCategory, selectStudents } from 'src/app/actions/actionCreators';
import { ActionCreator, AnyAction } from 'redux';

interface IRiskCategoryOwnProps {
  /** key for link to store */
  categoryKey: string;
  name: string;
}

interface IRiskCategoryStateProps {
  /** name of the category */
  name: string;
  /** is category on track */
  onTrack: boolean;
  /** number of students, belong to category */
  numberOfStudents: number;
  /** key of current opened category */
  categorySelected: string;
  /** students in category */
  studentsData: any[]; // TODO
}

interface IRiskCategoryDispatchProps {
  /** select & open category */
  selectCategory: ActionCreator<AnyAction>;
  /** select students actionCreator */
  selectStudents: ActionCreator<AnyAction>;
}

type IRiskCategoryProps = IRiskCategoryOwnProps & IRiskCategoryStateProps & IRiskCategoryDispatchProps;

/**
 * Risk category with students data
 */
class RiskCategory extends React.Component<IRiskCategoryProps> {
  /** is current category currently selected */
  private _isCategorySelected = () => {
    return this.props.categoryKey === this.props.categorySelected;
  };

  /**
   * toggle body view
   */
  private _toggleOpen = () => {
    // console.log(this.props);

    if (this._isCategorySelected()) {
      this.props.selectCategory(null);
      this.props.selectStudents([]);
    } else {
      this.props.selectCategory(this.props.categoryKey);
      this.props.selectStudents(this.props.studentsData.map((student) => student.id));
    }
  };

  /** render v-dom */
  public render() {
    const openClass = this._isCategorySelected() ? 'soomo-open' : 'soomo-close';

    return (
      <div className="riskCategory">
        <div className={`riskCategory-head ${openClass} default-padding`} onClick={this._toggleOpen}>
          <div className="riskCategory-name">
            <div className={`riskCategory-name-status riskCategory-name-status-${this.props.onTrack}`}>
              {!this.props.onTrack && this.props.numberOfStudents}
            </div>
            <div className="riskCategory-name-content">
              {this.props.name}
              {this.props.onTrack && (
                <span className="riskCategory-name-content-students"> ({this.props.numberOfStudents})</span>
              )}
            </div>
          </div>
        </div>
        <Collapse in={this._isCategorySelected()}>
          <div>
            {/* without div collapsible works incorrect */}
            <RiskCategoryStudentsTable categoryKey={this.props.categoryKey} />
          </div>
        </Collapse>
      </div>
    );
  }
}

export default connect(
  (state: IGlobalState, ownProps: IRiskCategoryOwnProps) => {
    const localState = getLocalState(state);

    // TODO
    return {
      onTrack: ownProps.categoryKey === 'stopped',
      categorySelected: localState.categorySelected,
      studentsData: localState.courseData.studentsData.students,
    };
  },
  {
    selectCategory,
    selectStudents,
  }
)(RiskCategory);
