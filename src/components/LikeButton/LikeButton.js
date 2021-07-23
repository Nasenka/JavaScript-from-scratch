import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import style from './LikeButton.module.css';

class LikeButton extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    isAuth: PropTypes.bool.isRequired,
    likedByUser: PropTypes.bool,
    likes: PropTypes.number,
    onClick: PropTypes.func.isRequired,
    typeButton: PropTypes.oneOf(['white', 'blue', '']),
  };

  static defaultProps = {
    className: undefined,
    likedByUser: false,
    likes: 0,
    typeButton: '',
  };

  render() {
    const {
      className,
      isAuth,
      likedByUser,
      likes,
      onClick,
      typeButton,
    } = this.props;

    return (
      <button
        className={classnames(style.like, className, style[typeButton], {
          [style.active]: likedByUser,
        })}
        disabled={!isAuth}
        title={isAuth ? undefined : 'Авторизуйтесь, чтобы поставить лайк'}
        type="button"
        onClick={onClick}
      >
        {likes}
      </button>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: !!state.user,
  };
};

export default connect(mapStateToProps, undefined)(LikeButton);
