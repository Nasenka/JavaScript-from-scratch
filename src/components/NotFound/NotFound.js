import React from 'react';
import { Link } from 'react-router-dom';

import Container from '../Container';

import style from './NotFound.module.css';

class NotFound extends React.PureComponent {
  render() {
    return (
      <main>
        <Container className={style.container}>
          <div className={style.images}>
            <img alt="Цифра 4" src="/number4.png" />
            <img alt="Буква О" src="/letterO.png" />
            <img alt="Цифра 4" src="/number4.png" />
          </div>
          <h1>Упс...</h1>
          <h2>Сыр не найден...</h2>
          <p>
            Похоже вы допустили опечатку, набирая адрес, или воспользовались
            неисправной ссылкой
          </p>
          <Link className={style.back} to="/">
            Вернуться на главную
          </Link>
        </Container>
      </main>
    );
  }
}

export default NotFound;
