import React from 'react';
import {Link} from 'react-router';
import EducationMeta from '../EducationMeta/EducationMeta.js';
import createMarkup from '../../utils/createMarkup.js';
import styles from './EducationCard.less';

class EducationCard extends React.Component {

  render () {
    const content = this.props.content;

    const title = createMarkup(content.get('title'));
    const titleTag = content.get('title');
    const linkURL = '/utbildningar/' + content.get('slug');
    const excerpt = content.getIn(['acf', 'excerpt']);
    const meta = content.get('acf');
    const status = content.getIn(['acf', 'status']);

    let statusText = '';
    switch (status) {
      case 'open':
        statusText = 'Utbildningen är öppen för ansökan';
        break;
      case 'closed':
        statusText = 'Ansökan är avslutad för i år';
        break;
      case 'notSearchable':
        statusText = 'Utbildningen är ej sökbar';
        break;
    }

    return (
      <article className={styles.base}>
        <div className={styles.content}>
          <header className={styles.header}>
            <Link to={linkURL} className={styles.headingLink}>
              <h1 dangerouslySetInnerHTML={title}
                  className={styles.heading}></h1>
            </Link>
          </header>
          <p className={styles.excerpt}>{excerpt}</p>
        </div>
        <div className={styles.meta}>
          <EducationMeta meta={meta} context='list'/>
        </div>
        <Link to={linkURL}
              className={styles.link}
              title={'Läs mer om ' + titleTag}>
          <span className={styles.arrowIcon}></span>
          <p className={styles.status}>{statusText}</p>
        </Link>
      </article>
    );
  }
}

EducationCard.propTypes = {
  content: React.PropTypes.object,
};

export default EducationCard;

/*
 <img className={styles.image}
 src={config.assetsPath + 'link-arrow.svg'}
 alt='link-arrow'/>*/
