import React, {Component} from 'react'
import './App.scss'
import {Route, NavLink} from 'react-router-dom'
import About from './About/About'
import Cars from './Cars/Cars'

// Route служит для регистрации наших роутов на другие страницы, path это путь к странице 
// Что бы страница не перезагружалась при переходе по ссылкам, нужно тег <a/> заменить на компанент NavLink
// exact свойство NavLink говорит то, что ссылка должна полностью совпадать с path (лучше делать так, меньше багов)
// свойство activeClassName - меняет стандартное имя класса активного роута
// свойство activeStyle - определяет стить активного роута, принимает объект
// в свойство to можно передавать не только строку с URL но и объект с параметрами конфигурации данного компанента (pathname - URL, search что должно идти после ? (GET запрос добавляется в URL), hash - параметры хеша ( что добавить в URL после #))

class App extends Component {
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
                search: '?a=1&b=2',
                hash: 'wfm-hash'
              }}>Cars</NavLink>
            </li>
          </ul>
        </nav>

        <hr/>

        {/*localhost:3000*/}
        <Route path="/" exact render={() => <h1>Home Page</h1>} />
        <Route path="/about" component={About} />
        <Route path="/cars" component={Cars} />

        {/* <About />

        <Cars /> */}
      </div>
    );
  }
}

export default App
