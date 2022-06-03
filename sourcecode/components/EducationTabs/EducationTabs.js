import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import createKeyFrom from '../../utils/createKeyFrom.js';
import createMarkup from '../../utils/createMarkup.js';
import styles from './EducationTabs.less';

class EducationTabs extends React.Component {

  constructor (props) {
    super(props);
    this.state = {};
    this.clickOnTab = this.clickOnTab.bind(this);
  }

  componentWillMount () {
    const tabs = this.props.tabs;
    if (!tabs.size) {
      return false;
    }

    const current = createKeyFrom(this.props.tabs.first().get('tab_title'));
    this.setState(
      {
        current: current,
        content: this.props.tabs,
      }
    );
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextState.current !== this.state.current;
  }

  clickOnTab (e) {
    this.setState(
      {current: e.target.getAttribute('data-target')}
    );
  }

  render () {
    const current = this.state.current;

    if (!current) {
      return false;
    }

    const tabTitles = this.props.tabs.map(tab => {
      const title = tab.get('tab_title');
      const key = createKeyFrom(title);
      const active = (current === key) ? 'active' : '';
      return (
        <li key={key}
            data-target={key}
            className={styles.listItem + ' ' + styles[active]}
            onClick={this.clickOnTab}>
          {title}
        </li>
      );
    }).toArray();

    let currentTab = this.state.content.filter(item => {
      const title = createKeyFrom(item.get('tab_title'));
      if (title === this.state.current) {
        return item;
      }
    });

    if (!currentTab.size) {
      currentTab = this.state.content;
    }

    const content = createMarkup(currentTab.first().get('tab_content'));

    return (
      <section className={styles.base}>
        <nav>
          <ul className={styles.list}>
            {tabTitles}
          </ul>
        </nav>
        <div className={styles.currentTab}>
          <ReactCSSTransitionGroup transitionName='example'
                                   transitionEnterTimeout={500}
                                   transitionLeaveTimeout={300}>
            <div key={'content_' + createKeyFrom(this.state.current)}
                 className={styles.transitionGroup}>
              <div className={styles.content}>
                <div dangerouslySetInnerHTML={content}></div>
              </div>
            </div>
          </ReactCSSTransitionGroup>
        </div>
      </section>
    );
  }
}

EducationTabs.propTypes = {
  tabs: React.PropTypes.object,
};

export default EducationTabs;
