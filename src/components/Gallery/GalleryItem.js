import PropTypes from 'prop-types';
import React from 'react';

import style from './Gallery.module.css';

class GalleryItem extends React.PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
  };

  render() {
    const { src } = this.props;

    return (
      <div className={style.galleryItem}>
        <img alt="Сыр" className={style.image} src={src} />
        <div className={style.author}>
          <img
            alt="Patrick Jansen"
            className={style.authorImage}
            src="https://lumpics.ru/wp-content/uploads/2017/11/Programmyi-dlya-sozdaniya-avatarok.png"
          />
          <a
            className={style.authorInfo}
            href="https://unsplash.com/@syrenko"
            rel="noreferrer"
            target="_blank"
          >
            <span className={style.authorName}>Patrick Jansen</span>
            <span className={style.date}>Published on April 21, 2021</span>
          </a>
        </div>
        <span className={style.like}>15</span>
      </div>
    );
  }
}

export default GalleryItem;
