import React from 'react';
import createMarkup from '../../utils/createMarkup.js';
import HeroBlockLinks from '../HeroBlockLinks/HeroBlockLinks.js';
import styles from './HeroBlock.less';

class HeroBlock extends React.Component {

  render () {
    const title = createMarkup(this.props.content.get('hero_title'));
    const body = createMarkup(this.props.content.get('hero_body'));
    const heroLinks = this.props.content.get('hero_links');
    const textColumns = this.props.content.get('hero_text_columns');
    const blackBackground = this.props.content.get('hero_background_black');

    const links = (heroLinks) ? <HeroBlockLinks links={heroLinks}/> : '';

    //const backgroundImage = this.props.content.get('hero_background_image');
    const backgroundImage = this.props.content.getIn(
      ['hero_background_image', 'sizes', 'large']
    );

    const colorScheme = (blackBackground) ? 'isBlack' : '';
    const textStyle = (textColumns) ? 'hasColumns' : '';
    const backgroundColor = (backgroundImage) ? 'hasImage' : '';
    const backgroundStyle = (backgroundImage) ? {
      backgroundImage: 'url(' + backgroundImage + ')',
    } : {};

    return (
      <section className={styles.base + ' ' + styles[backgroundColor] + ' ' + styles[colorScheme]}
               style={backgroundStyle}>
        <div className={styles.content}>
          <h1 dangerouslySetInnerHTML={title} className={styles.title}></h1>
          <p dangerouslySetInnerHTML={body} className={styles.text + ' ' + styles[textStyle]}></p>
          {links}
        </div>
      </section>
    );
  }
}

HeroBlock.propTypes = {
  content: React.PropTypes.object,
};

export default HeroBlock;
