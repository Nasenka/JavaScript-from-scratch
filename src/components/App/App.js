import React from 'react';

import Gallery from '../Gallery';

import style from './App.module.css';

class App extends React.PureComponent {
  render() {
    return (
      <>
        <header className={style.header}>
          <div className={style.container}>
            <div>Логотип</div>
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
