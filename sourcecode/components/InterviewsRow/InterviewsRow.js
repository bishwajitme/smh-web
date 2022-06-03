import React from 'react';
import ArticleStore from '../../stores/ArticleStore';
import ArticleActions from '../../actions/ArticleActions';
import ArticleRow from './../ArticleRow/ArticleRow.js';
import {Link} from 'react-router';
import styles from './InterviewsRow.less';

class InterviewsRow extends React.Component {

  constructor (props) {
    super(props);
    this.state = this.getState(props);
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  componentDidMount () {
    ArticleStore.addListener('change', this.onStoreChange);
    this.props.content.get('article_row').map(article => {
      const ID = article.get('ID');
      if (ID) {
        ArticleActions.fetchByID(ID);
      }
    });
  }

  componentWillUnmount () {
    ArticleStore.removeListener('change', this.onStoreChange);
  }

  onStoreChange () {
    const props = this.props;
    this.setState(this.getState(props));
  }

  getState (props) {
    const articleRow = props.content.get('article_row');
    const interviewsArray = articleRow.filter(interview => {
      return interview.get('ID');
    }).map(interview => {
      return interview.get('ID');
    }).toArray();
    return {
      interviews: ArticleStore.getFromList(interviewsArray),
    };
  }

  render () {
    const articles = this.state.interviews;
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
                    context='interviewsRow'/>

      </section>
    );
  }
}

InterviewsRow.propTypes = {
  content: React.PropTypes.object,
};

export default InterviewsRow;
