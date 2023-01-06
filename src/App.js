import './App.css';
import React from 'react';
import Home from './components/Home/Home.js';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import { Routes  , Route  } from 'react-router-dom'
import AddStock from './components/AddStock/AddStock';
import Login from './components/Login/Login';
function App() {
  return (
    <ThemeProvider 
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs"
     >
      <Routes > 
        <Route path='/' element={<Home />} />
        <Route path='/addStock' element={<AddStock />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Home />} />
      </Routes >  
       
    </ThemeProvider>
    
  ); 
}

export default App;