import React, { Component } from 'react';
import styles from './inlineFrame.less';
import { iframeResizer } from 'iframe-resizer';

class InlineFrame extends Component {
  handleIframeOnLoad() {
    iframeResizer({}, '#iframe');
  }

  render() {
    return (
        <iframe
          title="iframe"
          id="iframe"
          ref="iframe"
          className={styles.iframe}
          frameBorder={0}
          height={this.props.height || 'auto'}
          onLoad={this.handleIframeOnLoad}
          src={this.props.src}
        />
    );
  }
}

export default InlineFrame;
