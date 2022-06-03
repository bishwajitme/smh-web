import React from 'react';
import {Link} from 'react-router';
import getSlugFromURL from '../../utils/getSlugFromURL.js';
import createMarkup from '../../utils/createMarkup.js';
import styles from './ArticleCard.less';

class ArticleCard extends React.Component {
  createDate (date) {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return (<span className={styles.date}>{day}/{month}/{year}</span>);
  }

  render () {
    const traImage = "https://www.smhsverige.se/wp-content/uploads/2019/02/43aspect.png";
    const content = this.props.content;
    const type = content.get('type');
    const title = createMarkup(content.get('title'));
    const titleTag = content.get('title');
    const excerpt = content.getIn(['acf', 'excerpt']);
    const date = new Date(content.get('date'));
    const publishDate = (type === 'nyheter') ? this.createDate(date) : false;
    const image = {
      backgroundImage: 'url(' + content.getIn(
        ['acf', 'featured_image', 'sizes', 'featured']
      ) + ')',
    };
    const linkURL = content.get('link');
    const linkTo = getSlugFromURL(linkURL);
    return (
      <article className={styles.base}>
        <div className={styles.image} style={image}>  <Link to={linkTo} className={styles.link}
                title={'Läs mer om ' + titleTag}><img src={traImage} /></Link></div>

        <div className={styles.content}>
          <header className={styles.header}>
            {publishDate}
            <Link to={linkTo} className={styles.headingLink}>
              <h1 dangerouslySetInnerHTML={title}
                  className={styles.heading}></h1>
            </Link>
          </header>
          <p className={styles.excerpt}>{excerpt}</p>
          <div className={styles.faded}>
            <Link to={linkTo} className={styles.link}
                  title={'Läs mer om ' + titleTag}>Läs mer</Link>
          </div>
        </div>
      </article>
    );
  }
}

ArticleCard.propTypes = {
  content: React.PropTypes.object
};

export default ArticleCard;
