import './App.css';
import React from 'react';

function App() {
  let a = 5;
  let textInput = React.createRef(); // создаём ref (служит для идентафикации элемента, если хотим получить доступ к элементу в лоп, а не как правильно)

  function f1(arg) {
    console.log(`f1 work - ${a} - ${arg}`);
  }

  function f2() {
    console.log('move');
  }

  function showInput() {
    console.log('Input')
    console.log(textInput.current.value) // получаем value инпута напряму, (не верно! надо делать через state)
  }

  return (
    <div className="block">
      <h1>Событие</h1>
      <section>
        <h2>Button</h2>
        <button onClick={() => f1(1)}>Push</button>
      </section>
      <section>
        <h2>Double click + mouse move</h2>
        <div className="test" onDoubleClick = {() => f1(2)} onMouseMove={f2}></div> {/* Можно вещать несколько событий на один элемент */}
      </section>
      <section>
        <h2>Input</h2>
        <input type="text" onInput={showInput} ref={textInput}/>
      </section>
    </div>
  );
}

export default App;
