import React from 'react';
import createMarkup from '../../utils/createMarkup.js';
import InlineFrame from '../InlineFrame/InlineFrame';
import styles from './SpecialPage.less';
import {is} from 'immutable';

class SpacialPage extends React.Component {
  constructor(props) {
    super(props);
    this.initScripts = this.initScripts.bind(this);
  }

  initScripts() {
    const scriptSrc = this.props.page.getIn(['acf', 'custom_script_source']);
    const scripts = this.props.page.getIn(['acf', 'custom_scripts']);

    if (scriptSrc) {
      const script = document.createElement("script");
      script.id = 'special-page-script';
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    }
    if (scripts) {
      const script = document.createElement("script");
      script.innerHTML = scripts;
      script.id = 'special-page-script';
      script.async = true;
      document.body.appendChild(script);
    }
  }

  removeScripts() {
    const specialPageScript = document.querySelector('#special-page-script');
    specialPageScript ? specialPageScript.remove() : false;
  }

  componentDidMount () {
    this.initScripts();
  }

  componentDidUpdate(nextProps) {
    if(!(is(this.props.page, nextProps.page))) {
      this.removeScripts();
      this.initScripts();
    }
  }

  componentWillUnmount() {
    this.removeScripts();
  }

  render () {
    const page = this.props.page;
    const title = createMarkup(page.get('title'));

    const iframeUrl = page.getIn(['acf', 'iframe_url']);
    const iframeHeight = page.getIn(['acf', 'iframe_height']);

    const customHtml = createMarkup(page.getIn(
      ['acf', 'custom_html'])
    );

    return (
      <div className={styles.base}>
        <header className={styles.header}>
          <h1 dangerouslySetInnerHTML={title}></h1>
        </header>
        <section className={styles.content}>
          {iframeUrl
          ? <InlineFrame src={iframeUrl} height={iframeHeight}/>
          : false}
          {customHtml
          ? <div dangerouslySetInnerHTML={customHtml}></div>
          : false}
        </section>
      </div>
    );
  }
}

SpacialPage.propTypes = {
  page: React.PropTypes.object,
};

export default SpacialPage;
