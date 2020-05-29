import React from 'react';
import { connect } from 'react-redux';
import CheckBox from 'src/components/ui/CheckBox';
import Button from 'react-bootstrap/es/Button';

import './riskCategory.scss';
import { selectStudents, addPopup, showPopup, addMessageSender } from 'src/app/actions/actionCreators';
import { ActionCreator, AnyAction } from 'redux';
import { Guid } from 'guid-typescript';
import { IGlobalState } from 'src/types';
import getLocalState from 'src/app/selectors/getLocalState';
import HeaderWithSub from 'src/components/ui/HeaderWithSub';
import StudentProgress from 'src/components/ui/StudentProgress';
import MessageSenderBody from 'src/components/containers/MessageSender/MessageSenderBody';
import MessageSenderHeader from 'src/components/containers/MessageSender/MessageSenderHeader';

interface IRiskCategoryStudentsTableOwnProps {
  /** key for link to store */
  categoryKey: string;
}

interface IRiskCategoryStudentsTableStateProps {
  /** name of the category */
  studentsData: any;
  /** ids of students to send message */
  studentsSelected: number[];
  /** list histories */
  histories: any[];
  /** current selected section */
  sectionSelected: number;
}

interface IRiskCategoryStudentsTableDispatchProps {
  /** add popup panel content */
  addPopup: ActionCreator<AnyAction>;
  /** add popup panel content */
  addMessageSender: ActionCreator<AnyAction>;
  /** show popup for small screens */
  showPopup: ActionCreator<AnyAction>;
  /** select students by id */
  selectStudents: ActionCreator<AnyAction>;
}

type IRiskCategoryStudentsTableProps = IRiskCategoryStudentsTableOwnProps &
  IRiskCategoryStudentsTableDispatchProps &
  IRiskCategoryStudentsTableStateProps;

/**
 * Risk category students data table
 */
class RiskCategoryStudentsTable extends React.Component<IRiskCategoryStudentsTableProps> {
  /** message selected students */
  private _messageSelected = () => {
    //
    // 2adf927d-df0f-f042-8693-b7950d7f019e === const ID for message,
    // with a few clicks on the button, the component will redraw
    //
    const guid = Guid.parse('2adf927d-df0f-f042-8693-b7950d7f019e');

    this.props.addMessageSender(guid, <MessageSenderHeader />, <MessageSenderBody />);
    this.props.showPopup(guid);
  };

  /** check or uncheck single student
   */
  private _toggleStudentSelection = (id: number) => {
    if (this.props.studentsSelected.includes(id)) {
      this.props.studentsSelected.splice(this.props.studentsSelected.indexOf(id), 1);
      this.props.selectStudents([...this.props.studentsSelected]);
    } else {
      this.props.selectStudents([...this.props.studentsSelected, id]);
    }
  };

  /** check or uncheck all students
   */
  private _toggleAll = () => {
    if (this.props.studentsSelected.length === this.props.studentsData.students.length) {
      this.props.selectStudents([]);
    } else {
      this.props.selectStudents(this.props.studentsData.students.map((student: any) => student.id));
    }
  };

  /**
   * render single row
   */
  private _renderStudentRow = (student: any) => {
    const name = `${student.first_name} ${student.last_name}`;
    const maxBarsForTrends = 12;

    let lastSingIn: string = '';

    if ('id' in student && 'measurements' in student) {
      student.measurements.forEach((measurement: any) => {
        if (measurement.dimension == 'last-signin') {
          lastSingIn = measurement.value;
        }
      });
    }

    const renderStudentLabel = () => {
      return <HeaderWithSub title={name} sub={`Last sign-in ${lastSingIn}`} size="medium" />;
    };

    let trend = this._getListTrendByStudentId(student.id);

    trend = trend.concat(Array(maxBarsForTrends).fill('unknown', 0, maxBarsForTrends)).slice(0, maxBarsForTrends);

    return (
      <div className="riskCategory-body-row default-padding" key={student.id}>
        <div onClick={this._toggleStudentSelection.bind(this, student.id)}>
          <CheckBox checked={this.props.studentsSelected.includes(student.id)} label={renderStudentLabel()} />
        </div>
        <div className="riskCategory-body-row-trend float-right">
          <StudentProgress data={trend} />
        </div>
      </div>
    );
  };

  // return risk by categoryKey
  public getRisksByCategoryKey(risks: any[], categoryKey: string) {
    let res: any = null;

    risks.forEach((risk) => {
      if (risk.category_key == categoryKey) {
        res = risk;
      }
    });
    return res;
  }

  private _getListTrendByStudentId(id: any) {
    const listTrend: any[] = []; // (1 trend - 1 week)

    if (this.props.sectionSelected) {
      const histories = this.props.histories[this.props.sectionSelected].histories;

      histories.forEach((historie: any) => {
        let isLogIn = false;

        historie.assessments.forEach((assessment: any) => {
          if (assessment.user.id === id) {
            const isOnTrack = this.getRisksByCategoryKey(assessment.risks, 'on-track');

            if (isOnTrack) {
              isLogIn = true;
            }
          }
        });

        listTrend.push(isLogIn);
      });
    }

    return listTrend;
  }

  private _getStudentsOfCategory() {
    let res: any[] = [];
    const categoryKey = this.props.categoryKey;
    const sectionSelected = this.props.sectionSelected;

    const CategoryMap: any = {
      stopped: 'noLogInLastWeek',
      'low-completion': 'missingWork',
      'low-score': 'lowScore',
    };
    const category = CategoryMap[categoryKey];

    if (sectionSelected in this.props.histories) {
      res = this.props.histories[sectionSelected].riskCategory[category];
    }

    return res;
  }

  private _getStudents() {
    let students: any[] = [];

    if (this.props.sectionSelected == 0) {
      // ALL SECTIONS
      students = this._getStudentsOfCategory();
    } else {
      // other section

      // filter studentdata
      this.props.studentsData.students.forEach((student: any) => {
        this._getStudentsOfCategory().forEach((stud) => {
          if (student.id == stud.id) {
            students.push(student);
          }
        });
      });
    }

    return students;
  }

  /** render v-dom */
  public render() {
    return (
      <div className="riskCategory-body">
        <div className="riskCategory-body-row default-padding">
          <div onClick={this._toggleAll}>
            <CheckBox
              checked={this.props.studentsSelected.length === this.props.studentsData.students.length}
              label="Select All"
            />
          </div>
          <Button disabled={this.props.studentsSelected.length === 0} onClick={this._messageSelected}>
            MESSAGE
          </Button>
        </div>
        {/* this.props.studentsData.students.map((student: any) => this._renderStudentRow(student)) */}
        {this._getStudents().map((student: any) => this._renderStudentRow(student))}
      </div>
    );
  }
}

export default connect(
  (state: IGlobalState) => {
    const localState = getLocalState(state);

    return {
      studentsSelected: localState.studentsSelected,
      studentsData: localState.courseData.studentsData,
      histories: localState.courseData.histories,
      sectionSelected: localState.sectionSelected,
    };
  },
  {
    addPopup,
    addMessageSender,
    showPopup,
    selectStudents,
  }
)(RiskCategoryStudentsTable);
