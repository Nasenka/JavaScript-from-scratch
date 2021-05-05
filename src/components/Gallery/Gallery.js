import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import style from './Gallery.module.css';
import GalleryItem from './GalleryItem';

class Gallery extends React.PureComponent {
  static propTypes = {
    gallery: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          src: PropTypes.string.isRequired,
        }).isRequired,
      ).isRequired,
    ).isRequired,
  };

  renderGallery(column) {
    const { gallery } = this.props;

    return gallery[column].map(photo => {
      return <GalleryItem key={photo.id} src={photo.src} />;
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

export default connect(mapStateToProps)(Gallery);
