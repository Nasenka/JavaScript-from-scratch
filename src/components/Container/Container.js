import PropTypes from 'prop-types';
import React from 'react';

import style from './Container.module.css';

class Container extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children } = this.props;

    return <div className={style.container}>{children}</div>;
  }
}

export default Container;
