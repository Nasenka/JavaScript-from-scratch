import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import unsplash from '../../unsplash';
import Auth from '../Auth';
import Container from '../Container';
import Gallery from '../Gallery';
import Photo from '../Photo';

import style from './App.module.css';

class App extends React.PureComponent {
  render() {
    const authenticationUrl = unsplash.auth.getAuthenticationUrl([
      'public',
      'write_likes',
    ]);

    return (
      <Router>
        <>
          <header className={style.header}>
            <div className={style.container}>
              <a href="/">
                <img
                  alt="Сырная лента"
                  className={style.logo}
                  src="/logo.png"
                />
              </a>
              <a className={style.login} href={authenticationUrl}>
                Вход
              </a>
            </div>
          </header>
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

export default App;
