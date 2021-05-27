import PropTypes from 'prop-types';
import React from 'react';

import style from './RelatedCollection.module.css';

class RelatedCollection extends React.PureComponent {
  static propTypes = {
    collectionLink: PropTypes.string.isRequired,
    previewPhotos: PropTypes.arrayOf(
      PropTypes.shape({
        urls: PropTypes.shape({
          small: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    ).isRequired,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    title: PropTypes.string.isRequired,
    totalPhotos: PropTypes.number.isRequired,
    userLink: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
  };

  renderCollectionImage(index) {
    const { previewPhotos, title } = this.props;

    return (
      <div className={style.imageWrapper}>
        {previewPhotos[index] ? (
          <img alt={title} src={previewPhotos[index].urls.small} />
        ) : null}
      </div>
    );
  }

  renderTags() {
    const { tags } = this.props;

    if (tags.length !== 0) {
      const newTags = tags.slice(0, 3);

      const photoTags = newTags.map(tag => {
        return (
          <li key={tag.title} className={style.tagItem}>
            {tag.title}
          </li>
        );
      });

      // eslint-disable-next-line react/prop-types
      return <ul className={style.tags}>{photoTags}</ul>;
    }

    return null;
  }

  render() {
    const {
      collectionLink,
      title,
      totalPhotos,
      userLink,
      userName,
    } = this.props;

    return (
      <div className={style.collection}>
        <a
          className={style.collectionImages}
          href={collectionLink}
          rel="noopener noreferrer"
          target="_blank"
        >
          {this.renderCollectionImage(0)}
          {this.renderCollectionImage(1)}
          {this.renderCollectionImage(2)}
        </a>
        <h3 className={style.collectionTitle}>{title}</h3>
        <div className={style.collectionInfo}>
          <span className={style.collectionPhotos}>{totalPhotos} фото</span>
          <span className={style.collectionAuthor}>
            Автор{' '}
            <a href={userLink} rel="noopener noreferrer" target="_blank">
              {userName}
            </a>
          </span>
        </div>
        {this.renderTags()}
      </div>
    );
  }
}

export default RelatedCollection;
