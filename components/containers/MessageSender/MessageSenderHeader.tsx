import React from 'react';

import './messageSender.scss';
import { connect } from 'react-redux';
import { IGlobalState } from 'src/types';
import getLocalState from 'src/app/selectors/getLocalState';

interface IMessageSenderStateProps {
  /** selected for messaging studentIds */
  studentsSelected: number[];
}

type IMessageSenderProps = IMessageSenderStateProps;

/**
 * Message sender container
 */
class MessageSenderHeader extends React.Component<IMessageSenderProps> {
  /** render v-dom */
  public render() {
    return (
      <div className="messageSenderHeader">
        <div className="messageSenderHeader-heading">Messages</div>
        <div className="messageSenderHeader-to">
          <div>To:</div>
          <div className="messageSenderHeader-students">
            {this.props.studentsSelected.map((name, i) => (
              <div key={name}>
                {name}
                {i === this.props.studentsSelected.length - 1 ? null : ', '}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state: IGlobalState) => {
  const localState = getLocalState(state);

  return {
    studentsSelected: localState.studentsSelected.map(
      (studentId) => localState.courseData.studentsData.find((st: any) => st.id === studentId).name
    ),
  };
})(MessageSenderHeader);
