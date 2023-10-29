import './App.css';

import AccountHome from './pages/home/account_home/index';
import CarHome from './pages/home/car_home/index';
import { BrowserRouter  as Router, Switch, Route,Routes, Link } from 'react-router-dom';
import Login from './pages/login/index'
import BaiVietHome from './pages/home/baiviet_home/baiViet';

function App() {
  return (
    <div className="App">
     
     <Router>
      <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/qlaccount' element={<AccountHome />} />
      <Route path='/qlcar' element={<CarHome />} />
      <Route path='/qlbaiviet' element={<BaiVietHome />} />

      </Routes>
      </Router>
   
    </div>
  );
}

export default App;
