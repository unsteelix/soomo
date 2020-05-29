import React from 'react';
import { connect } from 'react-redux';
import { getCourseData, showPopup, addPopup } from '../../app/actions/actionCreators';

import './weeklyOutreach.scss';

import { IGlobalState } from 'src/types';
import getLocalState from 'src/app/selectors/getLocalState';
import { ActionCreator, AnyAction } from 'redux';
import WeeklyOutreachCard from 'src/components/containers/WeeklyOutreachCard';
// import FacultyGuide from 'src/components/containers/FacultyGuide';
import { IPopup } from 'src/app/types';
import Preloader from 'src/components/ui/Preloader';
import Popup from 'src/components/containers/Popup';
import { Guid } from 'guid-typescript';

interface IWeeklyOutreachOwnProps {
  /** institutional course id - parent for group of courses */
  IC_Id: number;
}

interface IWeeklyOutreachStateProps {
  /** is app working with remote server */
  isLoading: boolean;
  /** is popup visible */
  popup: IPopup;
}

interface IWeeklyOutreachDispatchProps {
  /**
   * dispatch number of async requests for fetching all data needed
   */
  getCourseData: ActionCreator<AnyAction>;
  /** show popup for small screens */
  showPopup: ActionCreator<AnyAction>;
  /** show popup for small screens */
  addPopup: ActionCreator<AnyAction>;
}

/**
 * Main entry point for ReachOut view component
 */
class WeeklyOutreach extends React.Component<
  IWeeklyOutreachDispatchProps & IWeeklyOutreachStateProps & IWeeklyOutreachOwnProps
> {
  /** after node mount */
  public componentDidMount(): void {
    this.props.getCourseData(this.props.IC_Id);
    // TODO remove this in working alpha
    const guid1 = Guid.create();
    // this.props.addPopup(guid1, <span>Faculty Guide</span>, <FacultyGuide />);

    this.props.addPopup(
      guid1,
      <div>
        <div className="icon-bells">&nbsp;</div>
        <span>
          <h3>Faculty Guide</h3>
        </span>
      </div>,
      <div>
        <div>
          Students who don’t engage with the work very rarely succeed. And the best way to get them moving is personal
          outreach from a caring human. Click on each of the categories here to send individual messages to these
          students who are clearly off-track.
        </div>
      </div>
    );
    this.props.showPopup(guid1);

    // const guid2 = Guid.create();

    // this.props.addPopup(
    //   guid2,
    //   <div>
    //     TFTYEWVECWTGYEFWJY Gfwehugw eygwyugweyugfweyugu wgywueg gweyf y ywqgfw weyu7qdy fwegyughjc gywefugwef
    //     TFTYEWVECWTGYEFWJY Gfwehugw eygwyugweyugfweyugu wgywueg gweyf y ywqgfw weyu7qdy fwegyughjc gywefugwef
    //     TFTYEWVECWTGYEFWJY Gfwehugw eygwyugweyugfweyugu wgywueg gweyf y ywqgfw weyu7qdy fwegyughjc gywefugwef
    //   </div>,
    //   <span>Faculty Guide</span>
    // );
    // this.props.showPopup(guid2);
    //
    const guid3 = Guid.create();

    this.props.addPopup(guid3, <span>Faculty Guide TT</span>, <div>jreihgreuhght</div>);
    this.props.showPopup(guid3);
  }

  /** render v-dom */
  public render() {
    return (
      <div className="soomo-outreach">
        <div className="soomo-outreach-cardContainer">
          <WeeklyOutreachCard />
        </div>
        <Popup />
        {this.props.isLoading && <Preloader />}
      </div>
    );
  }
}

export default connect(
  (state: IGlobalState) => {
    const localState = getLocalState(state);

    return {
      ls: localState,
      popup: localState.popup,
      isLoading: localState.isLoading,
    };
  },
  {
    getCourseData,
    showPopup,
    addPopup,
  }
)(WeeklyOutreach);
