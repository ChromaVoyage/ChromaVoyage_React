import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './components/Main/Main';
import LoginPage from './components/LoginPage/LoginPage';
import KakaoMap2 from './KakaoMap2';
import { MyContextProvider } from './MyContextProvider';
import LoginCallback from './components/LoginPage/LoginCallback';

function App() {

  return (
    <BrowserRouter>
    <MyContextProvider>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Main />}/>
          <Route path="/login" exact element={<LoginPage />}/>
          <Route path="/login/auth/callback/google" exact element={<LoginCallback />}/>     
        </Routes>
      </div>
      </MyContextProvider>
    </BrowserRouter>
  );
}

export default App;