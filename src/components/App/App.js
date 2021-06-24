import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { fetchUser, resetUser } from '../../actions/user';
import unsplash from '../../unsplash';
import Auth from '../Auth';
import Container from '../Container';
import Gallery from '../Gallery';
import Photo from '../Photo';

import style from './App.module.css';

class App extends React.PureComponent {
  static propTypes = {
    fetchUser: PropTypes.func.isRequired,

    resetUser: PropTypes.func.isRequired,

    user: PropTypes.shape({
      first_name: PropTypes.string,
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

  componentDidMount() {
    const { fetchUser } = this.props;

    if (localStorage.getItem('bearerToken')) {
      fetchUser();
    }
  }

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
          <a
            className={style.userLink}
            href={user.links.html}
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              alt={user.first_name}
              className={style.userImage}
              src={user.profile_image.medium}
            />
            <span className={style.userName}>{user.first_name}</span>
          </a>
          <a className={style.logout} href="/" onClick={this.handleClick}>
            Выход
          </a>
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
      <Router>
        <>
          <header className={style.header}>
            <div className={style.container}>
              <a href="/">
                <img
                  alt="Сырная лента"
                  className={style.logo}
                  src="/logo.png"
                />
              </a>
              {this.renderUser()}
            </div>
          </header>
          <main>
            <Container>
              <Switch>
                <Route exact path="/">
                  <Gallery />
                  <Auth />
                </Route>
                <Route component={Photo} path="/photos/:id" />
                <Route>
                  <h2>Сыр не найден</h2>
                </Route>
              </Switch>
            </Container>
          </main>
        </>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  fetchUser,
  resetUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
