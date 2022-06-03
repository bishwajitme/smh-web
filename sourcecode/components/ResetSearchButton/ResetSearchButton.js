import React from 'react';
import {Link} from 'react-router';
import styles from './ResetSearchButton.less';

class ResetSearchButton extends React.Component {

  render () {
    const title = this.props.title || 'Se alla utbildningar';
    const linkProps = {
      id: 'reset-button',
      to: '/utbildningar',
    };

    return (
      <Link className={styles.base} {...linkProps}>
        <span>{title}</span>
      </Link>
    );
  }
}

ResetSearchButton.propTypes = {
  title: React.PropTypes.string,
};

export default ResetSearchButton;
