import React from 'react';
import { IPopup } from 'src/app/types';
import MessageSenderHeader from 'src/components/containers/MessageSender/MessageSenderHeader';
import MessageSenderBody from 'src/components/containers/MessageSender/MessageSenderBody';
import { Guid } from 'guid-typescript';

interface IMessageSenderProps {
  /** popup state */
  popup: IPopup;
  /** hideMessageSender func */
  hideMessageSender: (id: Guid) => void;
}

/** Message sender */
class MessageSender extends React.Component<IMessageSenderProps> {
  constructor(props: any) {
    super(props);
  }

  /** render v-dom */
  public render() {
    const { popup, hideMessageSender } = this.props;

    return (
      <div className="soomo-message-sender-container">
        <div className="soomo-popup-header">
          <button className="soomo-popup-close" onClick={hideMessageSender.bind(null, popup.id)} />
        </div>
        <div className="default-padding">
          <MessageSenderHeader />
          <MessageSenderBody />
        </div>
      </div>
    );
  }
}

export default MessageSender;
