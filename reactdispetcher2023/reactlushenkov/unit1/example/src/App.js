import './App.css';
import TestFunc from './TestFunc';
import Header from './Header/Header';
import Goods from './Googs';

const headerData = {
  site_name: 'my test site name',
  nav: [
    {'link' : 'nav1', 'text' : 'my link'},
    {'link' : 'nav2', 'text' : 'my link 2'},
    {'link' : 'nav3', 'text' : 'my link 3'},
  ]
}

const goods = [
  {'title': 'apple', 'cost': 330, 'image': 'https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_apple_ios-256.png'},
  {'title': 'pear', 'cost': 530, 'image': 'https://cdn0.iconfinder.com/data/icons/fruity-3/512/Pear-256.png'}
];

function App() {
  return (
    <>
      <Header data={headerData}/>
      <TestFunc />
      {goods.map(item => {
        return <Goods key={item.title} title={item.title} cost={item.cost} image={item.image}/>
      })}
      
    </>
  );
}

export default App;
