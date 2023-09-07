import './App.css';
import Header from './Header';
import About from './About';
import Users from './Users';
import Main from './Main';
import UserId from './UserId';
import Error from './Error';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

/// Информация нижу почти не актуальна лучше смотреть про роутинг на https://metanit.com/web/react/4.1.php

function App() {
  return (
    <>
      {/* <Header /> */}
      <Router>
        <nav> 
          <li><Link to="/">Main</Link></li> {/* Link должны быть именно в роуторе */}
          <li><Link to="/about">About</Link></li>
          <li><Link to="/users">Users</Link></li>
        </nav>
        <Routes>
          <Route exact path='/' element={<Main />}></Route> {/*  При загрузке страницы сравниваются адреса в path, exact - точное совпадение*/}
          <Route path='/about' element={<About />}></Route> {/*  Название компанента может не совпадать ссылкой на страницу */}
          <Route exact path='/users' element={<Users />}></Route>
          <Route path='/users/:userName' element={<UserId />}></Route> {/* Так определяем дочерний маршрут с помощъю хука useParams */}
          <Route path='*' element={<Error />}></Route> {/** для всех остальных страниц - страница ошибки, не найдена такая страница 404 */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
