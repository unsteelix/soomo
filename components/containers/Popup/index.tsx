import React from 'react';

import './popup.scss';
import { connect } from 'react-redux';
import getLocalState from 'src/app/selectors/getLocalState';
import { IGlobalState } from 'src/types';
import { IPopup } from 'src/app/types';
import { hidePopup, hideMessageSender } from 'src/app/actions/actionCreators';
import { ActionCreator, AnyAction } from 'redux';
import { Guid } from 'guid-typescript';
import { PopupItem } from './popupItem';
import MessageSender from 'src/components/containers/MessageSender';

const EMPTY_POPUP_ID = Guid.createEmpty();

interface IPopupStateProps {
  /** popup state */
  popup: IPopup;
  /** popups state */
  popups: IPopup[];
  /** popups state */
  messageSenders: IPopup[];
}

interface IPopupDispatchProps {
  /** hide popup after click on close button */
  hidePopup: ActionCreator<AnyAction>;
  /** hide messageSender after click on close button */
  hideMessageSender: ActionCreator<AnyAction>;
}

interface IState {
  /** current popup id, for mobile screen */
  checkedPopupId: Guid;
}

/**
 * Popup for small screens
 */
class Popup extends React.Component<IPopupStateProps & IPopupDispatchProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      checkedPopupId: props.popups[0] ? props.popups[0].id : EMPTY_POPUP_ID,
    };
  }

  /** componentDidUpdate */
  public componentDidUpdate(preProps: any) {
    const popupsVisible = this.props.popups.filter((e) => e.visible);

    if (this.state.checkedPopupId.equals(EMPTY_POPUP_ID) && popupsVisible.length > 0) {
      this._initPopupId(popupsVisible[0].id);
    } else if (!this.state.checkedPopupId.equals(EMPTY_POPUP_ID) && popupsVisible.length === 0) {
      this._initPopupId(EMPTY_POPUP_ID);
    }

    if (document.getElementById('popup-shadow')) {
      document.getElementById('popup-shadow').addEventListener(
        'touchmove',
        (e) => {
          e.stopPropagation();
          e.preventDefault();
        },
        { passive: false }
      );
    }
  }

  /** init popup id, for mobile screen */
  private _initPopupId = (newId: Guid) => {
    this.setState({ checkedPopupId: newId });
  };

  /** hide popup after click on close button */
  private _hidePopup = (id: Guid) => {
    const { popups } = this.props;

    if (popups.length === 1) {
      this.setState({ checkedPopupId: Guid.createEmpty() });
    } else {
      const currentIndexOfPopups = popups.findIndex((e) => e.id.equals(this.state.checkedPopupId));

      this.setState({ checkedPopupId: popups[(currentIndexOfPopups + 1) % popups.length].id });
    }
    this.props.hidePopup(id);
  };

  /** hide messageSender after click on close button */
  private _hideMessageSender = (id: Guid) => {
    this.props.hideMessageSender(id);
  };

  /** change popup id, for mobile screen */
  private _changeCurrentPopup = (event: any) => {
    this.setState({ checkedPopupId: Guid.parse(event.target.id) });
  };

  /** render v-dom */
  public render() {
    const { checkedPopupId } = this.state;
    const { popups, messageSenders } = this.props;

    const popupsVisible = popups.filter((e) => e.visible);

    if (popupsVisible.length === 0 && messageSenders.length === 0) {
      return null;
    }

    return (
      <div className="aside">
        {popupsVisible.length > 0 && (
          <div className="soomo-popup-container" id="popup-shadow">
            <div className="carousel">
              {popupsVisible.map((popup) => {
                if (popup.visible) {
                  return (
                    <PopupItem
                      key={popup.id.toString()}
                      popup={popup}
                      hidePopup={this._hidePopup}
                      changeCurrentPopup={this._changeCurrentPopup}
                      checkedPopupId={checkedPopupId}
                    />
                  );
                }
              })}
            </div>
            {popupsVisible.length > 0 && (
              <div className="carousel-indicators">
                {popupsVisible.map((popup) => {
                  if (popup.visible) {
                    return (
                      <label
                        htmlFor={popup.id.toString()}
                        className={popup.id.equals(checkedPopupId) ? 'carousel-bullet-checked' : 'carousel-bullet'}
                      >
                        •
                      </label>
                    );
                  }
                })}
              </div>
            )}
          </div>
        )}
        {messageSenders.length > 0 && (
          <div className="soomo-popup-container" id="popup-shadow">
            {messageSenders.map((popup) => {
              return (
                <MessageSender key={popup.id.toString()} popup={popup} hideMessageSender={this._hideMessageSender} />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  (state: IGlobalState) => {
    const localState = getLocalState(state);

    return {
      popup: localState.popup,
      popups: localState.popups,
      messageSenders: localState.messageSenders,
    };
  },
  {
    hidePopup,
    hideMessageSender,
  }
)(Popup);
