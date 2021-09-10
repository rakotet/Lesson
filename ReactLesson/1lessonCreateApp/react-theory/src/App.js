import './App.css';
import Car from './Car/Car'
import Counter from './Counter/Counter'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary' // компанент для отлавливания ошибок, оборачивает в себя не компаненты которые будет отрабатывать
import React from 'react';

// <Car name={'Ford'} year={2018}/> передаём параметры в компонент
// <Car> <p style={{color: 'red'}}>COLOR</p> </Car> // ёще один способ передавать пареметры в компонент
// для передачи параметров в ф-ю нужно использовать bind где первый аргумент это контекст, а второй параметры ф-и
// Для прослушивания события input используется onChange={ф-я}
// В JSX комментарии пишутся {/* коммент */}
// В React списки выводятся через {перебираем методом, например map и возвращаем jsx} но при этом у каждого элемента списка должен быть свой особый key
// Особенности логических операторов в JSX (запрещен if, цикл for и другие блочные конструкции, но при этом можно пользоваться тернарным оператором)
// Так же всеми условными операторами можно пользоваться до JSX например в методе render()
// CSS стили в React пишут только в камелкейсе (каждое слово с большой буквы, без дефисов)
// Жизненный цикл доступен только в тех компанентах, которые наследуются от React.Component
// Первая ф-я которая вызывается в React компаненте это constructor а потом уже все остальные ф-и жизненного цикла компанента
// Можно передавать контекст (пропсы и состояния) не от элемента к элементу спускаясь вниз по иерархии элементов, а сразу в нужный компанент используя React.createContext()
//

export const ClickedContext = React.createContext() // создаём переменную для передачи контекста в элементы которые находятся где то глубоко по иерархии компанентов, и задаём ему дефолтное значение

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { // в React параметры принято передавать в объекте state (а не прям с самом компаненте писать новые значения) (Это объект состояния)
      clicked: false,
      cars: [
        {name: 'Ford', year: 2018},
        {name: 'Audi', year: 2016},
        {name: 'Mazda', year: 2010}
      ], 
      pageTitle: 'React components',
      showCars: false
    }
  }

  // Способ определения state без конструктора класса (но документация говорит использовать именно конструктор)
  // state = { // в React параметры принято передавать в объекте state (а не прям с самом компаненте писать новые значения) (Это объект состояния)
  //   cars: [
  //     {name: 'Ford', year: 2018},
  //     {name: 'Audi', year: 2016},
  //     {name: 'Mazda', year: 2010}
  //   ], 
  //   pageTitle: 'React components',
  //   showCars: false
  // }

  changeTitleHandler = (newTitle) => {
    this.setState({ // В React менять состояния компанента можно только через метод setState
      pageTitle: newTitle
    })
  }

  toggleCarsHandler = () => {
    this.setState({
      showCars: !this.state.showCars
    })
  }

  onChangeName(name, index) { // что бы изменять динамически списки, нужно создавать клон state, его менять а потом менять состояние через setState
    const car = this.state.cars[index]
    car.name = name
    const cars = [...this.state.cars] // разворачиваем массив из state.cars в новый массив (клонируем массив изпользуя spread (...))
    cars[index] = car
    this.setState({cars})
  }

  deleteHandler(index) { // если использовать обычные ф-и а не стрелочные, то при вызове функции обязательно нужно использовать bind(this)
    const cars = this.state.cars.concat() // клонируем массив в нашу переменную
    cars.splice(index, 1) // удаляем элемент из массива
    this.setState({cars})
  }

  // handleInput = (event) => {
  //   this.setState({
  //     pageTitle: event.target.value
  //   })
  // }


  // componentWillMount() { // Методы жизненного цикла компонента (этот инициализирует компанент) (Уже устаревшие, новые смотреть в документации)
  //   console.log('App componentWillMount');
  // }

  // componentDidMount() { // этот запускается после render и говорит что компанент готов к изменениям 
  //   console.log('App componentDidMount');
  // }

  render() {
    console.log('App render');

    const divStyle = { // объект для передачи CSS стиля прямо в JSX
      textAlign: 'center'
    }

    let cars = null

    if(this.state.showCars) {
      cars = this.state.cars.map((car, index) => { // Выводим список компанентов с параметрами, количество зависит от state, при этом используем тернарный оператор
        return (
          <ErrorBoundary key={index} /* ключ котрый нужен React для работы со списками (должен быть обязательно в корневом элементе!)*/ > 
            <Car 
              name={car.name}
              year={car.year}
              index={index}
              onDelete={this.deleteHandler.bind(this, index)}
              onChangeName={(event) => {this.onChangeName(event.target.value, index)}}
              // onChangeTitle={this.changeTitleHandler.bind(this, car.name)}
            />
          </ErrorBoundary>
        )
      })
    }

    // const cars = this.state.cars

  return (
    <div style={divStyle} className="App"> {/* Добавляем стиль прямо в тег в JSX */}

      {/* <h1>{this.state.pageTitle}</h1> */}
      <h1>{this.props.title}</h1> {/** Можно обращаться к пропсам и в классах React если они были переданны в компонент */}

      <ClickedContext.Provider value={this.state.clicked}> {/* указываем что тут мы передаём контекст, через .Provider , указываем в value что именно передаём, и оборачиваем в него ток компанент внутрь которого мы передаём контекст, который потом смогут использовать конпаненты внутри него*/}
        <Counter /> 
      </ClickedContext.Provider>
      

      <hr/>

      {/* <input type="text" onChange={this.handleInput}/> Прослушиваем input и обрататываем его значение ф-й */}

      <button onClick={this.changeTitleHandler.bind(this, 'Changed!')}>Change title</button> 
      <button onClick={this.toggleCarsHandler}>Toogl Cars</button> 

      <button onClick={() => {this.setState({clicked: true})}}>Change clicked</button>

      <div style={{
        width: '400px',
        margin: 'auto',
        paddingTop: '20px'
      }}>
        { cars }
      </div>

      {/*
      // Не правильный способ работы со списками

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
      /> */}
    </div>
    );
  }
}

export default App;
