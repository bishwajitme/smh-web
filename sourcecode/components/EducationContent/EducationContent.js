import React from 'react';
import createMarkup from '../../utils/createMarkup.js';
import wrapVideo from '../../utils/wrapVideo.js';
import styles from './EducationContent.less';

class EducationContent extends React.Component {
  render() {
    const educationContent = this.props.content;

    if (!educationContent.size) {
      return false;
    }

    const content = createMarkup(educationContent.getIn(
        ['acf', 'content'])
    );

    if (content.__html) {
      content.__html = wrapVideo(content.__html);
    }

    return (
      <article className={styles.base}>
        <div className={styles.content}>
          <div dangerouslySetInnerHTML={content}></div>
        </div>
      </article>
    );
  }
}

EducationContent.propTypes = {
  content: React.PropTypes.object,
};

export default EducationContent;
