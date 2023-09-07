import './App.css';
import Child from './Child';
import Test from './Test';
import React, {useState} from 'react'

function App() {
  const refRange = React.createRef() // создаём ref, который может ссылаться на элемент и получать доступ к его свойствам
  const refDiv = React.createRef()
  const refF = React.createRef()
  const [s1, setS1] = useState(50)

  let a = 50

  function changeHandler(event) {
    a = event.target.value
    console.log(a)
    setS1(a)
  }

  function changeHandler2() {
    let elem = refRange.current; // в current ссылка на элемент DOM и его свойства
    console.log(elem.value)
    let div = refDiv.current;
    console.log(div.innerHTML)
  }

  return (
    <>
      <div>
        <input type="range" onChange={changeHandler}/>
      </div>
      <div>
        <input type="range" ref={refRange}/>
      </div>
      <div ref={refDiv}>some text</div>
      <div>
        <button onClick={changeHandler2}>Push</button>
      </div>
      <Child p1={s1}></Child>
      <Test ref={refF}></Test> {/* Так будет ошибка, работает в классовом компаненте */}
    </>
  );
}

export default App;
