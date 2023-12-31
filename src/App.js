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
            {/* 기본 경로를 /login으로 설정 */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/auth/callback/google" element={<LoginCallback />} />
            <Route path="/main" element={<Main />} />
          </Routes>
        </div>
      </MyContextProvider>
    </BrowserRouter>
  );
}

export default App;