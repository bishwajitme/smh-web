import React from 'react';
import ArticleStore from '../../stores/ArticleStore';
import ArticleActions from '../../actions/ArticleActions';
import ArticleRow from './../ArticleRow/ArticleRow.js';
import {Link} from 'react-router';
import styles from './EducationArticleRow.less';

class EducationArticleRow extends React.Component {

  constructor (props) {
    super(props);
    this.state = this.getState(props);
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  componentDidMount () {
    ArticleStore.addListener('change', this.onStoreChange);
    ArticleActions.fetchIndex();
  }

  componentWillUnmount () {
    ArticleStore.removeListener('change', this.onStoreChange);
  }

  onStoreChange () {
    const props = this.props;
    this.setState(this.getState(props));
  }

  getState (props) {
    const row = props.content.get('article_row');
    const articleArray = (row) ? row.map(interview => {
      return interview.get('ID');
    }).toArray() : [];
    return {
      articles: ArticleStore.getFromList(articleArray),
    };
  }

  render () {
    const articles = this.state.articles;

    if (!articles.size) {
      return false;
    }
    const content = this.props.content;
    const header = content.get('article_row_header');

    let link = '';
    if (content.get('article_row_link')) {
      const linkName = content.get('article_row_link_name');
      const linkTarget = '/' + content.get('article_row_link_target')
          .first()
          .get('post_name');

      link = (
        <Link key={linkTarget}
              to={linkTarget}
              className={styles.link}>
          {linkName}
        </Link>
      );
    }

    const images = content.get('article_row').filter(interview => {
      if (interview.get('acf_fc_layout') === 'image') {
        return interview.get('image');
      }
    }).toArray();

    return (
      <section>
        <header className={styles.header}>
          <h1 className={styles.heading}>{header}</h1>
          {link}
        </header>
        <ArticleRow articles={articles} images={images}
                    context='educationArticleRow'/>
      </section>
    );
  }
}

EducationArticleRow.propTypes = {
  content: React.PropTypes.object,
};

export default EducationArticleRow;
