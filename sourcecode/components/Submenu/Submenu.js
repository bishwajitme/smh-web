import React from 'react';
import MenuStore from '../../stores/MenuStore.js';
import SubmenuItem from '../SubmenuItem/SubmenuItem.js';
import SubmenuRoot from '../SubmenuRoot/SubmenuRoot.js';
import config from 'webpack-config-loader!conf';
import styles from './Submenu.less';

class Submenu extends React.Component {

  constructor (props) {
    super(props);
    this.state = this.getState(props);
    this.onMenuStoreChange = this.onMenuStoreChange.bind(this);
  }

  componentDidMount () {
    MenuStore.addListener('change', this.onMenuStoreChange);
  }

  componentWillUnmount () {
    MenuStore.removeListener('change', this.onMenuStoreChange);
  }

  componentWillReceiveProps (nextProps) {
    this.state = this.getState(nextProps);
  }

  onMenuStoreChange () {
    this.setState(this.getState(this.props));
  }

  getState (props) {
    return {
      subpages: MenuStore.getPageSubmenu(config.menuID, props.parent),
    };
  }

  render () {
    const subpages = this.state.subpages;
    if (!subpages.items || !subpages.items.length ||
      subpages.items.length <= 1) {
      return false;
    }

    const parent = subpages.parent;

    const subpagesItems = subpages.items.map(page => {
      const key = page.get('ID');
      return <SubmenuItem key={key} page={page}/>;
    });

    return (
      <nav className={styles.base}>
        <SubmenuRoot root={parent}/>
        <ul className={styles.list}>
          {subpagesItems}
        </ul>
      </nav>
    );
  }
}

Submenu.propTypes = {
  parent: React.PropTypes.number,
};

export default Submenu;
