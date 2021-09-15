import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { resetUser } from '../../actions/user';
import unsplash from '../../unsplash';
import Container from '../Container';

import style from './Header.module.css';

class Header extends React.PureComponent {
  static propTypes = {
    resetUser: PropTypes.func.isRequired,

    user: PropTypes.shape({
      name: PropTypes.string,
      links: PropTypes.shape({
        html: PropTypes.string,
      }),
      profile_image: PropTypes.shape({
        medium: PropTypes.string,
      }),
    }),
  };

  static defaultProps = {
    user: null,
  };

  handleClick = () => {
    const { resetUser } = this.props;

    resetUser();

    localStorage.removeItem('bearerToken');
  };

  renderUser() {
    const authenticationUrl = unsplash.auth.getAuthenticationUrl([
      'public',
      'write_likes',
    ]);

    const { user } = this.props;

    if (user) {
      return (
        <div className={style.user}>
          <img
            alt={user.name}
            className={style.userImage}
            src={user.profile_image.medium}
          />
          <div className={style.userMenu}>
            <a
              className={style.userLink}
              href={user.links.html}
              rel="noopener noreferrer"
              target="_blank"
            >
              {user.name}
            </a>
            <button
              className={style.logout}
              type="button"
              onClick={this.handleClick}
            >
              Выход
            </button>
          </div>
        </div>
      );
    }

    return (
      <a className={style.login} href={authenticationUrl}>
        Вход
      </a>
    );
  }

  render() {
    return (
      <header className={style.header}>
        <Container className={style.container}>
          <Link className={style.logo} to="/">
            <img alt="Сырная лента" className={style.logoImg} src="/logo.png" />
            <span className={style.lotoText}>Сырная лента</span>
          </Link>
          {this.renderUser()}
        </Container>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  resetUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
