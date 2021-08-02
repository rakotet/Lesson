import React, {Component} from 'react'
import './App.scss'
import {Route, NavLink, Switch, Redirect} from 'react-router-dom'
import About from './About/About'
import Cars from './Cars/Cars'
import CarDetail from './CarDetail/CarDetail'

// Route служит для регистрации наших роутов на другие страницы, path это путь к странице 
// Что бы страница не перезагружалась при переходе по ссылкам, нужно тег <a/> заменить на компанент NavLink
// exact свойство NavLink говорит то, что ссылка должна полностью совпадать с path (лучше делать так, меньше багов)
// свойство activeClassName - меняет стандартное имя класса активного роута
// свойство activeStyle - определяет стить активного роута, принимает объект
// в свойство to можно передавать не только строку с URL но и объект с параметрами конфигурации данного компанента (pathname - URL, search что должно идти после ? (GET запрос добавляется в URL), hash - параметры хеша ( что добавить в URL после #))

class App extends Component {

  state = {
    isLoggedIn: false
  }

  render() {

    return (
      <div>
        <nav className="nav">
          <ul>
            <li>
              <NavLink 
                to="/" 
                exact 
                activeClassName={'wfm-active'}
              >Home</NavLink>
            </li>
            <li>
              <NavLink 
                to="/about"
                activeStyle={{
                  color: 'blue'
                }}
              >About</NavLink>
            </li>
            <li>
              <NavLink to={{
                pathname: '/cars',
                // search: '?a=1&b=2',
                // hash: 'wfm-hash'
              }}>Cars</NavLink>
            </li>
          </ul>
        </nav>

        <hr/>

        <div style={{textAlign: 'center'}}>
          <h3>Is logget in {this.state.isLoggedIn ? 'TRUE' : 'FALSE'}</h3>
          <button onClick={() => this.setState({isLoggedIn: !this.state.isLoggedIn})}>Login</button>
        </div>

        <hr/>

        {/*localhost:3000*/}
        <Switch> {/* Switch выдает первый роут который совпадает с url */}
          <Route path="/" exact render={() => <h1>Home Page</h1>} />

          {this.state.isLoggedIn ? <Route path="/about" component={About} /> : null} {/* делаем защиту на роут (рендерить компанент роута или нет взависимости от состояния параметна в нашем случае this.state.isLoggedIn) */}
          

          <Route path="/cars:name" component={CarDetail} /> {/*динамический роут*/}
          <Route path="/cars" component={Cars} />
          <Redirect to={'/'} /> {/* если нет совпадений с роутами то переходим спомощью редиректа на главную страницу */}
          {/* <Route render={() => <h1 style={{color: 'red', textAlign: 'center'}}>404 not found</h1>} /> редирект на страницу 404 если перешли на url который мы не обрабатываем, данный роут должен идти самым последним в Switch */}
        </Switch>

        {/* <About />

        <Cars /> */}
      </div>
    );
  }
}

export default App
