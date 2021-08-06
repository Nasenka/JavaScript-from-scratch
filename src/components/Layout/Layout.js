import PropTypes from 'prop-types';
import React from 'react';

import Container from '../Container';
import Footer from '../Footer/Footer';
import Header from '../Header';

class Layout extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children } = this.props;

    return (
      <>
        <Header />
        <main>
          <Container>{children}</Container>
        </main>
        <Footer />
      </>
    );
  }
}

export default Layout;
