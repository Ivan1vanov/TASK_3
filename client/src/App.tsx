import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './components/Layout/Layouts';
import MainPage from './pages/MainPage/MainPage';
import AuthPage from './pages/AuthPage/AuthPage';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Layout>
      <Routes>
        <Route path='/' element={<MainPage/>} />
        <Route path='/auth' element={<AuthPage/>} />
      </Routes>
      </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
