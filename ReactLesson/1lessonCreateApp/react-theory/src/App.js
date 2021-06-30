import './App.css';
import Car from './Car/Car'

// <Car name={'Ford'} year={2018}/> передаём параметры в компонент
// <Car> <p style={{color: 'red'}}>COLOR</p> </Car> // ёще один способ передавать пареметры в компонент
function App() {
  const state = { // в React параметры принято передавать в объекте state (а не прям с самом компаненте писать новые значения)
    cars: [
      {name: 'Ford', year: 2018},
      {name: 'Audi', year: 2016},
      {name: 'Mazda', year: 2010}
    ], 
    pageTitle: 'React components'
  }

  const cars = state.cars

  function changeTitleHandler() {
    console.log('Clicked');
  }

  return (
    <div className="App">
      <h1>{state.pageTitle}</h1>

      <button onClick={changeTitleHandler}>Change title</button>

      <Car name={cars[0].name} year={cars[0].year}>
        <p style={{color: 'blue'}}>COLOR</p>
      </Car>
      <Car name={cars[1].name} year={cars[1].year}> 
        <p style={{color: 'red'}}>COLOR</p>
      </Car>
      <Car name={cars[2].name} year={cars[2].year}/>
    </div>
  );
}

export default App;
