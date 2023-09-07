import './App.css';
import React from 'react';

function App() {

  const title = React.createElement('h1', {}, 'Text Header 1') // 1 - сам элемент, 2 - пропсы (объект), 3 - текст внутри спмого элемента
  const title2 = React.createElement('h2', {
    'style': {
      'color': 'red'
    },
    'className': 'italic bold' // можно присваивать сразу несколько классов
  }, 'Text Header 2')

  const span = React.createElement('span', {}, 'span')
  const p = React.createElement('p', {}, span) // создаём вложенный элемент

  return (
    <>
      <React.Fragment>
        Hello
      </React.Fragment>
      {title} {/*вставляем созданный элемент */}
      <div>
        {title2}
      </div>
      <div>
        {p}
      </div>
    </>
  );
}

export default App;
