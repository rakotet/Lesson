import './App.css';
import GoodsList from './containers/GoodsList'
import CartList from './containers/CartList';

function App() {
  return (
    <>
      {/**Вывод данных из хранилища */}
      <GoodsList />
      <CartList />
    </>
  );
}

export default App;
