import React from 'react';

import './messageSuccess.scss';
import { connect } from 'react-redux';
import { IGlobalState } from 'src/types';
import getLocalState from 'src/app/selectors/getLocalState';

interface IMessageSuccessStateProps {
  /** selected for messaging studentIds */
  studentsSelected: number[];
}

type IMessageSuccessProps = IMessageSuccessStateProps;

/**
 * Message success container
 */
class MessageSuccess extends React.Component<IMessageSuccessProps> {
  /** render v-dom */
  public render() {
    return (
      <div className="messageSuccess">
        <div>Message sent!</div>
        <div>To: </div>
        <div>
          This message will appear in each student’s webtext. No student will see the names of the other recipients.
        </div>
      </div>
    );
  }
}

export default connect((state: IGlobalState) => {
  const localState = getLocalState(state);

  return {
    studentsSelected: localState.studentsSelected,
  };
})(MessageSuccess);
