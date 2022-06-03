import React, { Component, PropTypes } from 'react';
import getSlugFromURL from '../../utils/getSlugFromURL.js';
import SiteID from './../SiteID/SiteID.js';
import MainMenu from '../MainMenu/MainMenu.js';
import SearchBar from './../SearchBar/SearchBar.js';
import styles from './SiteHeader.less';

class SiteHeader extends Component {
  render() {
    const isMobile = window.innerWidth <= 500 || window.innerHeight <= 500;
    const url = window.location.href;
    const linkClasss = getSlugFromURL(url);
    let linkClass = linkClasss.substring(1);
    let linkCond = false;
console.log(isMobile);
  if(linkClasss.substring(1) == '' && !isMobile){
      linkCond = true;
  }
  if(linkClass==''){
     linkClass = 'homepage';
  }
    return (
      <header id={linkClass}  className={styles.base}>
      {linkCond ? (
        <video id="myVideo" poster="https://www.smhsverige.se/wp-content/uploads/2015/08/Main_Comp-0-00-09-22.png" muted autoPlay loop >
          <source src="https://www.smhsverige.se/wp-content/uploads/2015/08/Video-ny-start-v2.mp4" type="video/mp4"/>
        </video>
      ) : (
        <div></div>
      )}


      <div className={styles.wrapper}>
        <div className={styles.top}>
          <SiteID />
          <MainMenu />
        </div>
        <SearchBar />
        </div>
      </header>
    );
  }
}

export default SiteHeader;
