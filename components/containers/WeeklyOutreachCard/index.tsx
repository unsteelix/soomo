// tslint:disable:no-magic-numbers
import React from 'react';

import './weeklyOutreachCard.scss';
import Row from 'react-bootstrap/es/Row';
import Col from 'react-bootstrap/es/Col';
import DropdownSection from 'src/components/containers/DropdownSection';
import Graph from 'src/components/ui/Graph';
import StudentsDynamic from 'src/components/containers/StudentsDynamic';
import ReachOut from 'src/components/containers/ReachOut';
import Container from 'react-bootstrap/es/Container';
import HeaderWithSub from 'src/components/ui/HeaderWithSub';

import { connect } from 'react-redux';
import { IGlobalState } from 'src/types';
import getLocalState from 'src/app/selectors/getLocalState';
import { selectSection } from 'src/app/actions/actionCreators';

interface WeeklyOutreachCardState {
  localState: any;
}

/**
 * WeeklyOutreachCard card
 */
class WeeklyOutreachCard extends React.Component<WeeklyOutreachCardState> {
  /** componentDidMount */
  public componentDidMount() {
    if (
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/Windows Phone/i) ||
      navigator.userAgent.match(/BlackBerry/i)
    ) {
      document.getElementById('container').className = 'unrotatable';
      document.getElementById('rotate-msg').className = 'visible-on-landscape';
    }

    // init object to store window properties
    const windowSize = {
      w: window.outerWidth,
      h: window.outerHeight,
      iw: window.innerWidth,
      ih: window.innerHeight,
    };

    window.addEventListener(
      'resize',
      () => {
        // if window resizes
        if (window.outerWidth !== windowSize.w || window.outerHeight !== windowSize.h) {
          windowSize.w = window.outerWidth; // update object with current window properties
          windowSize.h = window.outerHeight;
          windowSize.iw = window.innerWidth;
          windowSize.ih = window.innerHeight;
          // console.log("you're resizing"); //output
        }
        // if the window doesn't resize but the content inside does by + or - 5%
        else if (
          window.innerWidth + window.innerWidth * 0.05 < windowSize.iw ||
          window.innerWidth - window.innerWidth * 0.05 > windowSize.iw
        ) {
          // console.log("you're zooming")
          windowSize.iw = window.innerWidth;
        }
      },
      false
    );
  }

  /** componentDidUpdate */
  public componentDidUpdate() {
    if (navigator.userAgent.match(/Version\/[\d\.]+.*Safari/) && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
      const iOSSpecialCssStyle =
        '.ct-chart > svg g.ct-series-a > line {fill: none !important; stroke: #14D2B8 !important} .ct-chart' +
        '> svg g.ct-series-b > line {fill: none !important; stroke: #F15887 !important}';
      const iosStyle = document.createElement('style');

      iosStyle.type = 'text/css';
      iosStyle.textContent = iOSSpecialCssStyle;
      // document.head.appendChild(iosStyle);

      // document.querySelectorAll('.ct-series-b line').forEach((line) => {
      //   line.setAttribute('style', 'fill: none; stroke: #F15887');
      // });
      // document.querySelectorAll('.ct-series-a line').forEach((line) => {
      //   line.setAttribute('style', 'fill: none; stroke: #14D2B8');
      // });
    }
    // console.log('students:');
    // console.log(this.props.localState.courseData);
    // достаем список студентов данного курса
    /*
    let sectionSelected = this.props.localState.sectionSelected;
    console.log(sectionSelected);
    if(sectionSelected && sectionSelected > 0){

      // тестовый запрос к API
      const testApiUrl = `//localhost:4000/outreach/courses/${sectionSelected}/students`;
      console.log(testApiUrl);
      axios.get(testApiUrl)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })

    }
    */
  }

  public getGraphData() {
    const sectionSelected = this.props.localState.sectionSelected || 0;
    let histories: any = null;

    let graphData = [];
    let listGreenBar: number[] = [];
    let listRedBar: number[] = [];
    let listGreyBar: number[] = [];

    let count_max_students = 0; // max height bar

    histories = this.props.localState.courseData.histories[sectionSelected];

    if (histories) {
      histories = histories.histories;

      // sort by date of snapshot_at
      histories.sort(function(a: any, b: any) {
        a = Date.parse(a.snapshot_at);
        b = Date.parse(b.snapshot_at);
        const res = a - b;

        return res;
      });

      // search max count of students (max height bar)
      histories.forEach((historie: any) => {
        const count_students = historie.assessments.length;

        if (count_students > count_max_students) {
          count_max_students = count_students;
        }

        // search count off-track / on-track
        let count_off_track = 0;
        let count_on_track = 0;

        historie.assessments.forEach((assessment: any) => {
          assessment.risks.forEach((risk: any) => {
            if (risk.category_key == 'off-track') {
              count_off_track++;
            } else if (risk.category_key == 'on-track') {
              count_on_track++;
            }
          });
        });

        // console.log(count_max_students);
        // console.log(count_off_track);
        // console.log(count_on_track);
        // console.log('===========================');

        listGreenBar.push(count_on_track);
        listRedBar.push(count_off_track);
      });

      listGreenBar.forEach((bar, index) => {
        const value = bar + listRedBar[index];

        listGreyBar.push(count_max_students - value);
      });
    }

    // console.log(this.props.localState);

    graphData = [listGreenBar, listRedBar, listGreyBar];

    // fill void bar if length less then 12
    if (listGreenBar.length <= 12) {
      const countVoidBar = 12 - listGreenBar.length;

      for (let i = 0; i < countVoidBar; i++) {
        graphData[0].push(0);
        graphData[1].push(0);
        graphData[2].push(count_max_students);
      }
    }

    // cut last 12 week if length to much
    if (listGreenBar.length > 12) {
      listGreenBar = listGreenBar.slice(-12);
      listRedBar = listGreenBar.slice(-12);
      listGreyBar = listGreenBar.slice(-12);
    }

    return graphData;
  }

  /*  return count column in main graph */
  public getCountWeek() {
    const graphData = this.getGraphData();
    const countWeek = graphData[0].length;

    return countWeek;
  }

  /** render v-dom */
  public render() {
    return (
      <Container fluid={true} className="weeklyOutreachContainer">
        <Row className="default-padding">
          <Col xs={6}>
            {/* TODO calculate date based on? */}
            <HeaderWithSub title="Weekly Outreach" sub="March 11-17, 2019" />
          </Col>
          <Col xs={6}>
            <div className="float-right">
              <DropdownSection />
            </div>
          </Col>
        </Row>
        {/*
        <svg style={{ height: 0 }}>
          <defs>
            <linearGradient
              id="grad"
              x1="0%"
              y1="0%"
              x2="70%"
              y2="0%"
              gradientUnits="userSpaceOnUse"
              gradientTransform="rotate(90)"
            >
              <stop offset="0.5" stop-color="#F15887" />
              <stop offset="1" stop-color="#FE9B86" />
            </linearGradient>
            <linearGradient
              id="grad2"
              x1="50%"
              y1="0%"
              x2="100%"
              y2="0%"
              gradientUnits="userSpaceOnUse"
              gradientTransform="rotate(90)"
            >
              <stop offset="0.5" stop-color="#14D2B8" />
              <stop offset="1" stop-color="#72F7C5" />
            </linearGradient>
          </defs>
        </svg>
        */}
        <Row>
          <Col xs={12}>
            <Graph data={this.getGraphData()} />
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <StudentsDynamic students={12} />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ReachOut />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(
  (state: IGlobalState) => {
    const localState = getLocalState(state);

    return {
      localState,
    };
  },
  {
    selectSection,
  }
)(WeeklyOutreachCard);
