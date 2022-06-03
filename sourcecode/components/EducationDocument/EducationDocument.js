import React from 'react';
import LinkButton from '../LinkButton/LinkButton.js';
import styles from './EducationDocument.less';

class EducationDocument extends React.Component {

  render () {
    const content = this.props.content;
    const target = content.get('education_document_link');
    if (!target) {
      return false;
    }

    const text = content.get('education_document_text') || '';
    const linkText = content.get('education_document_button_text') || '';

    const linkProps = {
      to: target,
      text: linkText,
      type: 'document',
    };

    return (
      <section className={styles.base}>
        <div className={styles.text}>
          {text}
        </div>
        <div className={styles.link}>
          <LinkButton {...linkProps} />
        </div>
      </section>
    );
  }
}

EducationDocument.propTypes = {
  content: React.PropTypes.object,
};

export default EducationDocument;
