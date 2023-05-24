import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Todopage from './Components/Todopage';
import Login from './Components/Login';
import Register from './Components/Register';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path="/signup" element={<Register/>}/>
          <Route path = "/home" element={<Todopage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
