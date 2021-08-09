import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { fetchGallery } from '../../actions/gallery';

import style from './Gallery.module.css';
import GalleryItem from './components/GalleryItem';

class Gallery extends React.PureComponent {
  static propTypes = {
    gallery: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          alt_description: PropTypes.string,
          created_at: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired,
          liked_by_user: PropTypes.bool.isRequired,
          likes: PropTypes.number.isRequired,
          urls: PropTypes.shape({
            regular: PropTypes.string,
          }),
          user: PropTypes.shape({
            links: PropTypes.shape({
              html: PropTypes.string.isRequired,
            }).isRequired,
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.shape({
              medium: PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired,
        }).isRequired,
      ).isRequired,
    ).isRequired,

    fetchGallery: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { fetchGallery } = this.props;

    fetchGallery();
  }

  renderGallery(column) {
    const { gallery } = this.props;

    return gallery[column].map(photo => {
      return (
        <GalleryItem
          key={photo.id}
          alt={photo.alt_description}
          created={photo.created_at}
          id={photo.id}
          likedByUser={photo.liked_by_user}
          likes={photo.likes}
          src={photo.urls.regular}
          user={photo.user.name}
          userImage={photo.user.profile_image.medium}
          userLink={photo.user.links.html}
        />
      );
    });
  }

  render() {
    const { gallery } = this.props;

    return (
      <>
        <div className={style.gallery}>
          {gallery.map((item, index) => {
            return (
              <div key={index} className={style.row}>
                {this.renderGallery(index)}
              </div>
            );
          })}
        </div>
        <button className={style.more} type="button">
          Загрузить еще
        </button>
      </>
    );
  }
}

const mapStateToProps = state => {
  const newGallery = [[], [], []];
  let currentColumn = 0;

  state.gallery.forEach(item => {
    newGallery[currentColumn].push(item);
    currentColumn = currentColumn === 2 ? 0 : currentColumn + 1;
  });

  return {
    gallery: newGallery,
  };
};

const mapDispatchToProps = {
  fetchGallery,
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
