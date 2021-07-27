import React from 'react';

import Container from '../Container';

import style from './Footer.module.css';

class Footer extends React.PureComponent {
  render() {
    return (
      <footer className={style.footer}>
        <Container className={style.container}>
          <div className={style.copyright}>&copy; Огаркова Анастасия, 2021</div>
          <a className={style.contacts} href="tel:+79028736999">
            +7 (902) 87-36-999
          </a>
        </Container>
      </footer>
    );
  }
}

export default Footer;
