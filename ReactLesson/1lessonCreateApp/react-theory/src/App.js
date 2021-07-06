import './App.css';
import Car from './Car/Car'
import React from 'react';

// <Car name={'Ford'} year={2018}/> передаём параметры в компонент
// <Car> <p style={{color: 'red'}}>COLOR</p> </Car> // ёще один способ передавать пареметры в компонент
// для передачи параметров в ф-ю нужно использовать bind где первый аргумент это контекст, а второй параметры ф-и
class App extends React.Component {
  state = { // в React параметры принято передавать в объекте state (а не прям с самом компаненте писать новые значения) (Это объект состояния)
    cars: [
      {name: 'Ford', year: 2018},
      {name: 'Audi', year: 2016},
      {name: 'Mazda', year: 2010}
    ], 
    pageTitle: 'React components'
  }

  changeTitleHandler = (newTitle) => {
    this.setState({ // В React менять состояния компанента можно только через метод setState
      pageTitle: newTitle
    })
  }

  render() {

    const cars = this.state.cars

  return (
    <div className="App">
      <h1>{this.state.pageTitle}</h1>

      <button onClick={this.changeTitleHandler.bind(this, 'Changed!')}>Change title</button> 

      <Car 
        name={cars[0].name} 
        year={cars[0].year}
        onChangeTitle={this.changeTitleHandler.bind(this, cars[0].name)} // 1-й способ: ф-и других компанентов передаются через создания ф-и и передачи в неё параметров в виде ф-й этого другого компанента по ссылке (через this)
      >
        <p style={{color: 'blue'}}>COLOR</p>
      </Car>
      <Car 
        name={cars[1].name} 
        year={cars[1].year}
        onChangeTitle={() => this.changeTitleHandler(cars[1].name)} // 2-й способ передачи аргументов в ф-ю компанента (через ф-ю в стрелочной ф-и), но этот способ жрет больше ресурсов браузера
      > 
        <p style={{color: 'red'}}>COLOR</p>
      </Car>
      <Car 
        name={cars[2].name} 
        year={cars[2].year}
        onChangeTitle={() => this.changeTitleHandler(cars[2].name)}
      />
    </div>
    );
  }
}

export default App;
