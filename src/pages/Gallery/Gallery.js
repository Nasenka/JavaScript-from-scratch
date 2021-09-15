import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { fetchGallery } from '../../actions/gallery';

import style from './Gallery.module.css';
import GalleryItem from './components/GalleryItem';

class Gallery extends React.PureComponent {
  static propTypes = {
    gallery: PropTypes.arrayOf(
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

    fetchGallery: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
  };

  state = {
    columnsNumber: 3,
  };

  gallery = React.createRef();

  isFetchBlocked = false;

  componentDidMount() {
    const { fetchGallery } = this.props;
    const gallery = this.renderColumn();

    if (gallery[0].length === 0) {
      fetchGallery();
    }

    this.handleResize();
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const { innerWidth } = window;

    if (innerWidth >= 992) {
      this.setState({
        columnsNumber: 3,
      });
    } else if (innerWidth < 992 && innerWidth > 767) {
      this.setState({
        columnsNumber: 2,
      });
    } else {
      this.setState({
        columnsNumber: 1,
      });
    }
  };

  handleScroll = () => {
    const { innerHeight, pageYOffset } = window;
    const { clientHeight } = this.gallery.current;
    const { fetchGallery } = this.props;

    if (innerHeight + pageYOffset >= clientHeight - 400) {
      if (!this.isFetchBlocked) {
        fetchGallery();
        this.isFetchBlocked = true;
      }
    } else {
      this.isFetchBlocked = false;
    }
  };

  handleClick = () => {
    const { fetchGallery } = this.props;

    fetchGallery();
  };

  renderColumn() {
    const { columnsNumber } = this.state;
    const { gallery } = this.props;
    const newGallery = Array.from(Array(columnsNumber)).map(() => []);
    let currentColumn = 0;

    gallery.forEach(item => {
      newGallery[currentColumn].push(item);
      currentColumn =
        currentColumn === columnsNumber - 1 ? 0 : currentColumn + 1;
    });

    return newGallery;
  }

  renderGallery(column) {
    const gallery = this.renderColumn();

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

  renderButton() {
    const { page, totalPages } = this.props;

    if (page < totalPages) {
      return (
        <button className={style.more} type="button" onClick={this.handleClick}>
          Загрузить еще
        </button>
      );
    }

    return null;
  }

  render() {
    const gallery = this.renderColumn();

    return (
      <>
        <div ref={this.gallery} className={style.gallery}>
          {gallery.map((item, index) => {
            return (
              <div key={index} className={style.row}>
                {this.renderGallery(index)}
              </div>
            );
          })}
        </div>
        {this.renderButton()}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    gallery: state.gallery.data,
    page: state.gallery.page,
    totalPages: state.gallery.totalPages,
  };
};

const mapDispatchToProps = {
  fetchGallery,
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
