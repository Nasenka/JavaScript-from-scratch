import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { toJson } from 'unsplash-js';

import { fetchUser } from '../../actions/user';
import unsplash from '../../unsplash';

class Auth extends React.PureComponent {
  static propTypes = {
    fetchUser: PropTypes.func.isRequired,
  };

  async componentDidMount() {
    const code = window.location.search.split('code=')[1];

    if (code) {
      const response = await unsplash.auth.userAuthentication(code);
      const data = await toJson(response);

      localStorage.setItem('bearerToken', data.access_token);

      unsplash.auth.setBearerToken(data.access_token);

      const { fetchUser } = this.props;

      fetchUser();

      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  render() {
    return null;
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

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
