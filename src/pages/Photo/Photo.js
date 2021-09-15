import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { fetchLike, fetchPhoto, fetchUnlike } from '../../actions/photo';
import Layout from '../../components/Layout';
import LikeButton from '../../components/LikeButton/LikeButton';
import NotFound from '../NotFound';

import style from './Photo.module.css';
import RelatedCollection from './components/RelatedCollection';

class Photo extends React.PureComponent {
  static propTypes = {
    fetchPhoto: PropTypes.func.isRequired,
    fetchLike: PropTypes.func.isRequired,
    fetchUnlike: PropTypes.func.isRequired,

    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,

    photo: PropTypes.shape({
      alt_description: PropTypes.string,
      created_at: PropTypes.string,
      exif: PropTypes.shape({
        make: PropTypes.string,
        model: PropTypes.string,
      }),
      height: PropTypes.number,
      id: PropTypes.string,
      likes: PropTypes.number,
      liked_by_user: PropTypes.bool,
      related_collections: PropTypes.shape({
        results: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string,
            links: PropTypes.shape({
              html: PropTypes.string,
            }),
            preview_photos: PropTypes.arrayOf(
              PropTypes.shape({
                id: PropTypes.string,
                urls: PropTypes.shape({
                  small: PropTypes.string,
                }),
              }),
            ),
            tags: PropTypes.arrayOf(
              PropTypes.shape({
                title: PropTypes.string,
              }),
            ),
            title: PropTypes.string,
            total_photos: PropTypes.number,
            user: PropTypes.shape({
              links: PropTypes.shape({
                html: PropTypes.string,
              }),
              name: PropTypes.string,
            }),
          }),
        ),
      }),
      tags: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
        }),
      ),
      urls: PropTypes.shape({
        full: PropTypes.string,
        regular: PropTypes.string,
      }),
      user: PropTypes.shape({
        links: PropTypes.shape({
          html: PropTypes.string,
        }),
        name: PropTypes.string,
        profile_image: PropTypes.shape({
          medium: PropTypes.string,
        }),
        total_photos: PropTypes.number,
      }),
      views: PropTypes.number,
      width: PropTypes.number,
      errors: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
  };

  componentDidMount() {
    const { fetchPhoto, match } = this.props;

    fetchPhoto(match.params.id);
  }

  handleBack = () => {
    window.history.back();
  };

  handleLike = async () => {
    const { photo, fetchLike, fetchUnlike } = this.props;

    if (photo.liked_by_user) {
      fetchUnlike(photo.id);
    } else {
      fetchLike(photo.id);
    }
  };

  renderDimensions() {
    const { photo } = this.props;

    if (photo.width && photo.height) {
      return (
        <p className={style.dimensions}>
          <b>Разрешение:</b>{' '}
          <a
            href={photo.urls.full}
            rel="noopener noreferrer"
            target="_blank"
            title="Смотреть фото"
          >
            {photo.width} x {photo.height}
          </a>
        </p>
      );
    }

    return null;
  }

  renderCamera() {
    const { photo } = this.props;

    if (photo.exif.make && photo.exif.model) {
      return (
        <p className={style.camera}>
          <b>Камера:</b> {photo.exif.make}, {photo.exif.model}
        </p>
      );
    }

    return null;
  }

  renderTags() {
    const { photo } = this.props;

    if (photo.tags.length !== 0) {
      const photoTags = photo.tags.map(tag => {
        return (
          <li key={tag.title} className={style.tagItem}>
            {tag.title}
          </li>
        );
      });

      return <ul className={style.tags}>{photoTags}</ul>;
    }

    return null;
  }

  renderRelatedCollections() {
    const { photo } = this.props;

    // eslint-disable-next-line react/prop-types
    return photo.related_collections.results.map(collection => {
      return (
        <RelatedCollection
          key={collection.id}
          collectionLink={collection.links.html}
          previewPhotos={collection.preview_photos}
          tags={collection.tags}
          title={collection.title}
          totalPhotos={collection.total_photos}
          userLink={collection.user.links.html}
          userName={collection.user.name}
        />
      );
    });
  }

  render() {
    const { photo } = this.props;
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const creationDate = new Date(photo.created_at);

    if (photo.errors) {
      return <NotFound />;
    }

    if (!photo.id) {
      return null;
    }

    return (
      <Layout>
        <div className={style.photo}>
          <div className={style.photoContainer}>
            <img
              alt={photo.alt_description}
              className={style.image}
              src={photo.urls.regular}
            />
          </div>
          <div className={style.photoInfo}>
            <a
              className={style.author}
              href={photo.user.links.html}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                alt={photo.user.name}
                className={style.authorImage}
                src={photo.user.profile_image.medium}
              />
              <span className={style.authorInfo}>
                <span className={style.authorName}>{photo.user.name}</span>
                <span className={style.totalPhotos}>
                  Фото: {photo.user.total_photos}
                </span>
              </span>
            </a>
            <LikeButton
              className={style.like}
              likedByUser={photo.liked_by_user}
              likes={photo.likes}
              typeButton="blue"
              onClick={this.handleLike}
            />
            <div className={style.details}>
              {this.renderDimensions()}
              {this.renderCamera()}
              <p className={style.date}>
                <b>Создано:</b>{' '}
                {creationDate.toLocaleDateString('ru-Ru', options)}
              </p>
              <p className={style.views}>
                <b>Просмотров:</b> {photo.views}
              </p>
            </div>
            {this.renderTags()}
          </div>
        </div>
        <h2 className={style.relatedTitle}>Похожие коллекции</h2>
        <div className={style.relatedCollections}>
          {this.renderRelatedCollections()}
        </div>
        <button
          className={style.back}
          title="Назад"
          type="button"
          onClick={this.handleBack}
        >
          Вернуться
        </button>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    photo: state.photo,
  };
};

const mapDispatchToProps = {
  fetchPhoto,
  fetchLike,
  fetchUnlike,
};

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
