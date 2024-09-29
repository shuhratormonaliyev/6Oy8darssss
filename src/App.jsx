import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Erorr from './components/Erorr';

function App() {
  return (
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route index element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/Home' element={<Home />} />
          <Route path='*' element={<Erorr />} />
        </Routes>
      </div>
  );
}
export default App;