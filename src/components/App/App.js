import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { fetchUser } from '../../actions/user';
import Auth from '../Auth';
import Gallery from '../Gallery';
import Layout from '../Layout';
import NotFound from '../NotFound';
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
          <Switch>
            <Route exact path="/">
              <Layout>
                <Gallery />
                <Auth />
              </Layout>
            </Route>
            <Route
              path="/photos/:id"
              render={({ match }) => (
                <Layout>
                  <Photo match={match} />
                </Layout>
              )}
            />
            <Route>
              <NotFound />
            </Route>
          </Switch>
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
