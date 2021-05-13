import PropTypes from 'prop-types';
import React from 'react';

import style from './Gallery.module.css';

class GalleryItem extends React.PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    userImage: PropTypes.string.isRequired,
    userLink: PropTypes.string.isRequired,
  };

  render() {
    const { alt, created, src, likes, user, userImage, userLink } = this.props;

    return (
      <div className={style.galleryItem}>
        <img alt={alt} className={style.image} src={src} />
        <div className={style.author}>
          <img alt={user} className={style.authorImage} src={userImage} />
          <a
            className={style.authorInfo}
            href={userLink}
            rel="noreferrer"
            target="_blank"
          >
            <span className={style.authorName}>{user}</span>
            <span className={style.date}>{created}</span>
          </a>
        </div>
        <span className={style.like}>{likes}</span>
      </div>
    );
  }
}

export default GalleryItem;
