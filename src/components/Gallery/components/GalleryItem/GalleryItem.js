import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import style from './GalleryItem.module.css';

class GalleryItem extends React.PureComponent {
  static propTypes = {
    alt: PropTypes.string,
    created: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    userImage: PropTypes.string.isRequired,
    userLink: PropTypes.string.isRequired,
  };

  static defaultProps = {
    alt: 'Сыр',
  };

  render() {
    const {
      alt,
      created,
      id,
      likes,
      src,
      user,
      userImage,
      userLink,
    } = this.props;
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const creationDate = new Date(created);

    return (
      <div className={style.galleryItem}>
        <Link to={`/photos/${id}`}>
          <img alt={alt} className={style.image} src={src} />
        </Link>
        <div className={style.author}>
          <img alt={user} className={style.authorImage} src={userImage} />
          <a
            className={style.authorInfo}
            href={userLink}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className={style.authorName}>{user}</span>
            <span className={style.date}>
              {creationDate.toLocaleDateString('ru-Ru', options)}
            </span>
          </a>
        </div>
        <span className={style.like}>{likes}</span>
      </div>
    );
  }
}

export default GalleryItem;
