import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Container from '../Container';
import Gallery from '../Gallery';
import Photo from '../Photo';

import style from './App.module.css';

class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <>
          <header className={style.header}>
            <div className={style.container}>
              <img alt="Сырная лента" className={style.logo} src="/logo.png" />
              <div>Вход</div>
            </div>
          </header>
          <main>
            <Container>
              <Switch>
                <Route exact path="/">
                  <Gallery />
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
