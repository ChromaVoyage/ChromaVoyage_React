import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './components/Main/Main';
import LoginPage from './components/LoginPage/LoginPage';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Main />}/>
          <Route path="/login" exact element={<LoginPage />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;