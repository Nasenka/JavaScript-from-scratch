import React from 'react';

import style from './Photo.module.css';

class Photo extends React.PureComponent {
  handleClick = () => {
    window.history.back();
  };

  render() {
    return (
      <div className={style.photo}>
        <img
          alt="Сыр"
          className={style.image}
          src="https://i.ytimg.com/vi/9lCdtB0fwr0/maxresdefault.jpg"
        />
        <div className={style.imageInfo}>
          <a
            className={style.author}
            href="https://i.ytimg.com/vi/9lCdtB0fwr0/maxresdefault.jpg"
            rel="noreferrer"
            target="_blank"
          >
            <img
              alt="user"
              className={style.authorImage}
              src="https://i.ytimg.com/vi/9lCdtB0fwr0/maxresdefault.jpg"
            />
            <span className={style.authorInfo}>
              <span className={style.authorName}>Alexander Maasch</span>
              <span className={style.date}>5 февраля 2017 г.</span>
            </span>
          </a>
          <span className={style.like}>379</span>
        </div>
        <button className={style.back} type="button" onClick={this.handleClick}>
          Назад
        </button>
      </div>
    );
  }
}

export default Photo;
