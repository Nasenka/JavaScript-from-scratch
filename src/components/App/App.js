import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { fetchUser } from '../../actions/user';
import Auth from '../../pages/Auth';
import Gallery from '../../pages/Gallery';
import NotFound from '../../pages/NotFound';
import Photo from '../../pages/Photo';
import Layout from '../Layout';

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
              render={({ match }) => <Photo match={match} />}
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
