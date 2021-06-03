import React from 'react';
import { toJson } from 'unsplash-js';

import unsplash from '../../unsplash';

class Auth extends React.PureComponent {
  async componentDidMount() {
    const code = window.location.search.split('code=')[1];

    if (code) {
      const response = await unsplash.auth.userAuthentication(code);
      const data = await toJson(response);

      unsplash.auth.setBearerToken(data.access_token);

      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  render() {
    return null;
  }
}

export default Auth;
