import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import style from './Container.module.css';

class Container extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: undefined,
  };

  render() {
    const { children, className } = this.props;

    return (
      <div className={classnames(style.container, className)}>{children}</div>
    );
  }
}

export default Container;
