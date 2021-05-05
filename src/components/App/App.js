import React from 'react';

import Gallery from '../Gallery';

import style from './App.module.css';

class App extends React.PureComponent {
  render() {
    return (
      <>
        <header className={style.header}>
          <div className={style.container}>
            <img alt="Сырная лента" className={style.logo} src="/logo.png" />
            <div>Вход</div>
          </div>
        </header>
        <main>
          <Gallery />
        </main>
      </>
    );
  }
}

export default App;
