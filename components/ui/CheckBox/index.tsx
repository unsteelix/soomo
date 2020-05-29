import React from 'react';

import './checkBox.scss';
import FormCheck from 'react-bootstrap/es/FormCheck';

interface ICheckBoxProps {
  /** is checked */
  checked: boolean;
  /** checkbox label */
  label: React.ReactElement | string;
}

/**
 * Simple Checkbox
 */
class CheckBox extends React.Component<ICheckBoxProps> {
  /** render v-dom */
  public render() {
    const additionalClass = this.props.checked ? 'soomo-checkBox-checked' : '';

    return (
      <FormCheck className={`soomo-checkBox ${additionalClass}`}>
        <FormCheck.Input type="checkbox" checked={this.props.checked} />
        <FormCheck.Label>{this.props.label}</FormCheck.Label>
      </FormCheck>
    );
  }
}

export default CheckBox;
