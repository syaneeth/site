import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import Home from './components/pages/home';
import Minting from './components/pages/minting';
import Staking from './components/pages/staking';
import Whitelist from './components/pages/whitelist';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />     
          <Route path='/minting' element={<Minting />} />
          <Route path='/staking' element={<Staking />} />
          <Route path='/server' element={<Whitelist />} />
        </Routes>
      </Router> 
    </>
  );
}

export default App;
