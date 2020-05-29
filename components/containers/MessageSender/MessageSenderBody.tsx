import React, { FormEvent } from 'react';

import './messageSender.scss';
import Button from 'react-bootstrap/es/Button';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/es/Form';
import FormText from 'react-bootstrap/es/FormText';
import { IGlobalState } from 'src/types';
import getLocalState from 'src/app/selectors/getLocalState';
import { sendMessage } from 'src/app/actions/actionCreators';
import { ActionCreator, AnyAction } from 'redux';

interface IMessageSenderStateProps {
  /** selected for messaging studentIds */
  studentsSelected: number[];
  /** selected for messaging category */
  categorySelected: string;
}

interface IMessageSenderDispatchProps {
  /** actionCreator to command to send message */
  sendMessage: ActionCreator<AnyAction>;
}

interface IMessageSenderState {
  /** test message for students */
  message: string;
}

type IMessageSenderProps = IMessageSenderStateProps & IMessageSenderDispatchProps;

/**
 * Message sender container
 */
class MessageSenderBody extends React.Component<IMessageSenderProps, IMessageSenderState> {
  constructor(props: IMessageSenderProps) {
    super(props);

    this.state = {
      message:
        'Hello! I noticed you haven’t logged in this week. ' +
        'It’s important to keep up with the work in the webtext in order to pass this class.',
    };
  }

  /** handler for textarea */
  private _changeText = (ev: FormEvent<FormText>) => {
    this.setState({
      message: (ev.target as any).value, // TODO
    });
  };

  /** send action to send message */
  private _sendMessage = () => {
    this.props.sendMessage(this.props.studentsSelected, this.props.categorySelected, this.state.message);
  };

  /** render v-dom */
  public render() {
    const { studentsSelected } = this.props;

    return (
      <div className="messageSenderBody">
        <div className="messageSenderBody-icon" />
        <Form>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows="3" value={this.state.message} onChange={this._changeText} />
          </Form.Group>
          <Button
            className="send-msg-btn"
            variant="primary"
            onClick={this._sendMessage}
            disabled={studentsSelected.length === 0}
          >
            Send
          </Button>
        </Form>
      </div>
    );
  }
}

export default connect(
  (state: IGlobalState) => {
    const localState = getLocalState(state);

    return {
      studentsSelected: localState.studentsSelected,
      categorySelected: localState.categorySelected,
    };
  },
  {
    sendMessage,
  }
)(MessageSenderBody);
