import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchLike, fetchUnlike } from '../../../../actions/gallery';
import LikeButton from '../../../../components/LikeButton/LikeButton';
import formatDate from '../../../../utils/formatDate';

import style from './GalleryItem.module.css';

class GalleryItem extends React.PureComponent {
  static propTypes = {
    alt: PropTypes.string,
    created: PropTypes.string.isRequired,
    fetchLike: PropTypes.func.isRequired,
    fetchUnlike: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    likedByUser: PropTypes.bool.isRequired,
    likes: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    userImage: PropTypes.string.isRequired,
    userLink: PropTypes.string.isRequired,
  };

  static defaultProps = {
    alt: 'Сыр',
  };

  handleClick = async () => {
    const { id, fetchLike, fetchUnlike, likedByUser } = this.props;

    if (likedByUser) {
      fetchUnlike(id);
    } else {
      fetchLike(id);
    }
  };

  render() {
    const {
      alt,
      created,
      id,
      likedByUser,
      likes,
      src,
      user,
      userImage,
      userLink,
    } = this.props;

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
            <span className={style.date}>{formatDate(created)}</span>
          </a>
        </div>
        <LikeButton
          className={style.like}
          likedByUser={likedByUser}
          likes={likes}
          typeButton="white"
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchLike,
  fetchUnlike,
};

export default connect(undefined, mapDispatchToProps)(GalleryItem);
