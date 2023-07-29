import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './components/NavBar/Nav';
import Main from './components/Main/Main';
import LoginPage from './components/LoginPage/LoginPage';
import Tab1 from './components/Tab1/Tab1';
import Tab2 from './components/Tab2/Tab2';
import Tab1_DS from './components/Tab1_DS/Tab1_DS';
import Tab2_DS from './components/Tab2_DS/Tab2_DS';

function App() {
  const [isTab1Open, setIsTab1Open] = useState(false);
  const [isTab2Open, setIsTab2Open] = useState(false);

  const handleToggleTab = () => {
    if (!isTab1Open && !isTab2Open) {
      // If no tab is open, open Tab1
      setIsTab1Open(true);
    } else if (isTab1Open && !isTab2Open) {
      // If Tab1 is open, toggle between Tab1 and Tab2
      setIsTab1Open(!isTab1Open);
      // setIsTab2Open(!isTab2Open);
    } else if (isTab1Open && isTab2Open) {
      setIsTab1Open(true);
      setIsTab2Open(false);
    }
    //Tab2는 버튼 조작으로 열리지 않고, Tab1 내부의 특정 동작에 의해 열림.
  };

  // Tab1에서 Tab2를 열기 위한 함수
  const handleOpenTab2 = () => {
    setIsTab2Open(true);
  };


  //DS (District Selected 시)
  const [isTab1_DSOpen, setIsTab1_DSOpen] = useState(false);
  const [isTab2_DSOpen, setIsTab2_DSOpen] = useState(false);

  const handleToggleTab_DS = () => {
    if (!isTab1_DSOpen && !isTab2_DSOpen) {
      // If no tab is open, open Tab1
      setIsTab1_DSOpen(true);
    } else if (isTab1_DSOpen && !isTab2_DSOpen) {
      // If Tab1 is open, toggle between Tab1 and Tab2
      setIsTab1_DSOpen(!isTab1_DSOpen);
      // setIsTab2Open(!isTab2Open);
    } else if (isTab1_DSOpen && isTab2_DSOpen) {
      setIsTab1_DSOpen(true);
      setIsTab2_DSOpen(false);
    }
    //Tab2는 버튼 조작으로 열리지 않고, Tab1 내부의 특정 동작에 의해 열림.
  };

  // Tab1에서 Tab2를 열기 위한 함수
  const handleOpenTab2_DS = () => {
    setIsTab2_DSOpen(true);
  };


  return (
    <BrowserRouter>
      <div className="App">
        {/* <Nav /> */}

        <div className="tabContainer">
        <Nav />

        {/* Tab Component */}
        {isTab1Open && <Tab1 openTab2={handleOpenTab2} isTab2Open={isTab2Open} />}
        {isTab2Open && <Tab2 />}
        
        {/* DS */}
        {/* {isTab1_DSOpen && <Tab1_DS openTab2_DS={handleOpenTab2_DS} isTab2_DSOpen={isTab2_DSOpen} />}
        {isTab2_DSOpen && <Tab2_DS />} */}
        
        {/* Button to show/hide the tab */}
        <button className="showTabButton" onClick={handleToggleTab}>
          <b>{isTab1Open ? '<' : '>'}</b>
        </button>

        {/* DS */}
        {/* <button className="showTabButton" onClick={handleToggleTab_DS}>
          <b>{isTab1_DSOpen ? '<' : '>'}</b>
        </button> */}

        </div>
        

        <Routes>
          <Route path="/" exact element={<Main />}/>
          <Route path="/login" exact element={<LoginPage />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;