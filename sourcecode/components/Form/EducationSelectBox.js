import React from 'react';
import createKeyFrom from '../../utils/createKeyFrom.js';
import styles from './EducationSelectBox.less';
import classNames from 'classnames/bind';

class EducationSelectBox extends React.Component {
  render() {

    const cx = classNames.bind(styles);

    const baseClass = cx({
      base: true,
      selected: this.props.selected === true,
    });

    return (
      <div className={baseClass}>
        <input
               id={createKeyFrom(this.props.label)}
               type='checkbox'
               checked={this.props.checked}
               className={styles.input}
               name={createKeyFrom(this.props.label)}
               data-education={this.props.education}
               data-location={this.props.location}
               value={this.props.label}
               data-gtm-type='input-checkbox'
               onClick={this.props.onClick}
          />
        <label htmlFor={createKeyFrom(this.props.label)}
               className={styles.label}>
          {this.props.label}
        </label>
      </div>
    );
  }
}

EducationSelectBox.propTypes = {
  checked: React.PropTypes.bool,
  education: React.PropTypes.string,
  key: React.PropTypes.string,
  label: React.PropTypes.string,
  location: React.PropTypes.string,
  onClick: React.PropTypes.func,
  selected: React.PropTypes.bool,
};

export default EducationSelectBox;
