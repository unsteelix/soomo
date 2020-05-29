import React from 'react';

import './dropdownSection.scss';
import { connect } from 'react-redux';
import { IGlobalState } from 'src/types';
import getLocalState from 'src/app/selectors/getLocalState';
import selectors from 'src/app/selectors';
import { ICourse } from 'src/app/types';
import { selectSection } from 'src/app/actions/actionCreators';
import { getStudentsData } from 'src/app/actions/actionCreators';
import { ActionCreator, AnyAction } from 'redux';
import Select, { components } from 'react-select';

interface IDropdownSectionStateProps {
  /** list of loaded courses */
  courses: ICourse[];
}

interface IDropdownSectionDispatchProps {
  /** select a section to show */
  selectSection: ActionCreator<AnyAction>;
  getStudentsData: ActionCreator<AnyAction>;
}

interface ISelectOption {
  /** value (id) for react-select (dropdown) */
  value: number | string;
  /** label display for react-select (dropdown) */
  label: string;
}

interface IState {
  /** current selected option from dropdown */
  selectedOption: ISelectOption;
}

const Control = (props: any) => {
  const { menuIsOpen } = props;
  const openClassName = menuIsOpen ? 'open' : '';

  return <components.Control {...props} className={'dropdown-section-control ' + openClassName} />;
};

const Menu = (props: any) => {
  return (
    <components.Menu {...props} className="dropdown-section-menu">
      {props.children}
    </components.Menu>
  );
};

const Option = (props: any) => {
  const { children, isSelected, innerProps } = props;
  return (
    <div {...innerProps} className="option">
      <label className="container-label">
        {children}
        <input type="radio" name="radio" checked={isSelected} />
        <span className="checkmark" />
      </label>
    </div>
  );
};

const IndicatorSeparator = () => <></>;

const DropdownIndicator = (props: any) => {
  const menuIsOpen = props.selectProps.menuIsOpen;
  return (
    <components.DropdownIndicator {...props}>
      {menuIsOpen ? <div className="dropdown-arrow-icon flip-y" /> : <div className="dropdown-arrow-icon" />}
    </components.DropdownIndicator>
  );
};

/**
 * Dropdown with aftertext
 */
class DropdownSection extends React.Component<IDropdownSectionStateProps & IDropdownSectionDispatchProps, IState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      selectedOption: null,
    };
  }

  /**
   * select courseId
   */
  private _onSelect = (ev: any) => {
    const targetSection = Number(ev.value);

    this.props.selectSection(targetSection);
    this.props.getStudentsData(targetSection);

    this.setState({ selectedOption: ev });
  };

  /** render v-dom */
  public render() {
    const { selectedOption } = this.state;

    const coursesOptions = [
      {
        value: '',
        label: 'ALL SECTIONS',
      } as ISelectOption,
      ...this.props.courses.map((course) => {
        return {
          value: course.id,
          label: course.product_name,
        } as ISelectOption;
      }),
    ];

    return (
      <div className="dropdown-section">
        <Select
          value={selectedOption || coursesOptions[0]}
          onChange={this._onSelect}
          options={coursesOptions}
          components={{ Control, Menu, Option, IndicatorSeparator, DropdownIndicator }}
          isSearchable={false}
        />
      </div>
    );
  }
}

export default connect(
  (state: IGlobalState) => {
    const localState = getLocalState(state);

    return {
      courses: selectors.getCourses(localState),
    };
  },
  {
    selectSection,
    getStudentsData,
  }
)(DropdownSection);
