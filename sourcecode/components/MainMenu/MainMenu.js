import React from 'react';
import MenuItem from './../MainMenuItem/MainMenuItem.js';
import MenuStore from '../../stores/MenuStore.js';
import MenuActions from '../../actions/MenuActions.js';
import getSlugFromURL from '../../utils/getSlugFromURL.js';
import 'classlist-polyfill';
import config from 'webpack-config-loader!conf';
import styles from './MainMenu.less';
import classNames from 'classnames/bind';

class MainMenu extends React.Component {

  constructor (props) {
    super(props);

    //Moved this out to be able to add more states
    const menuStoreState = this.getStoreState();

    this.state = {
      menu: menuStoreState.menu,
      visible: false,
    };

    this.onStoreChange = this.onStoreChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onMenuClick = this.onMenuClick.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  componentDidMount () {
    window.addEventListener('resize', this.onResize);
    MenuStore.addListener('change', this.onStoreChange);
    MenuActions.fetchByID(config.menuID);
  }

  componentWillUnmount () {
    MenuStore.removeListener('change', this.onStoreChange);
    window.removeEventListener('resize', this.onResize);
  }

  onStoreChange () {
    this.setState(this.getStoreState());
  }

  getStoreState () {
    return {
      menu: MenuStore.getTopLevelItems(config.menuID),
    };
  }

  toggle (e) {
    e.preventDefault();
    const body = document.getElementsByTagName('body')[0];

    this.setState({visible: !this.state.visible});

    if (this.state.visible) {
      body.classList.remove(styles.disableScroll);
    } else {
      body.classList.add(styles.disableScroll);
    }
  }

  close () {
    const body = document.getElementsByTagName('body')[0];
    this.setState({visible: false});

    body.classList.remove(styles.disableScroll);
  }

  onMenuClick () {
    this.close();
  }

  onResize () {
    const w = window.outerWidth;
    if ( w > 960 ) {
      this.close();
    }
  }

  render () {
    const menu = this.state.menu;
    if (!menu) {
      return false;
    }

    const cx = classNames.bind(styles);

    const toggleNavStyles = cx({
      mobileBtn: true,
      showBtn: this.state.visible === true,
    });

    const overlayNavStyles = cx({
      nav: true,
      show: this.state.visible === true,
      hide: this.state.visible === false,
    });

    const items = this.state.menu.map((item) => {

      const URL = item.get('url');
      const slug = getSlugFromURL(URL);
      return (
        <MenuItem
          key={slug}
          slug={slug}
          title={item.get('title')}
          description={item.getIn(['acf', 'description'])}
          onClick={this.onMenuClick}
          />
      );
    }).toArray();

    return (
      <div className={styles.base}>
        <a href='#'
           className={toggleNavStyles}
           onClick={this.toggle}>
          <span></span>
        </a>
        <nav className={overlayNavStyles}>
          <ul className={styles.list}>
            {items}
          </ul>
        </nav>
      </div>
    );
  }
}

export default MainMenu;
