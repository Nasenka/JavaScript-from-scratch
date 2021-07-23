import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { fetchUser } from '../../actions/user';
import Auth from '../Auth';
import Container from '../Container';
import Gallery from '../Gallery';
import Header from '../Header';
import Photo from '../Photo';

class App extends React.PureComponent {
  static propTypes = {
    fetchUser: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { fetchUser } = this.props;

    if (localStorage.getItem('bearerToken')) {
      fetchUser();
    }
  }

  render() {
    return (
      <Router>
        <>
          <Header />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
