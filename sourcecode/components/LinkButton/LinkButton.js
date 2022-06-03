import React from 'react';
import {Link} from 'react-router';
import styles from './LinkButton.less';
import classNames from 'classnames/bind';

class Button extends React.Component {

  render () {
    const cx = classNames.bind(styles);

    const target = this.props.to;
    const text = this.props.text;
    const type = this.props.type;

    let link = '';
    if (type === 'external' || type === 'document' || type === 'anchor') {
      const linkStyle = cx({
        button: true,
        external: this.props.type === 'external',
        document: this.props.type === 'document',
        anchor: this.props.type === 'anchor',
      });

      link = (
        <a
          href={target}
          className={linkStyle}
          >
          {text}
        </a>
      );
    } else {
      const linkStyle = cx({
        button: true,
        internal: this.props.type === 'internal',
      });

      link = (
        <Link
          to={target}
          className={linkStyle}
          >
          {text}
        </Link>
      );
    }

    return (
      <span>
        {link}
      </span>
    );
  }
}

Button.propTypes = {
  text: React.PropTypes.string,
  to: React.PropTypes.string,
  type: React.PropTypes.string,
};

export default Button;
