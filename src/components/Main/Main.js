import React, { useState, useContext, useEffect } from 'react';
import './Main.css';
import Nav from '../NavBar/Nav';
import Tab1 from '../Tab1/Tab1';
import Tab2 from '../Tab2/Tab2';
import Tab1_DS from '../Tab1_DS/Tab1_DS';
import Tab2_DS from '../Tab2_DS/Tab2_DS';
import KakaoMap2 from '../../KakaoMap2';
import { MyContext } from '../../MyContextProvider';

function Main() {
  const [isTab1Open, setIsTab1Open] = useState(false);
  const [isTab2Open, setIsTab2Open] = useState(false);
  const { apiPlacesClick, setApiPlacesClick } = useContext(MyContext);

  const handleToggleTab = () => {
    if (!isTab1Open && !isTab2Open) {
      // If no tab is open, open Tab1
      setIsTab1Open(true);
    } else if (isTab1Open && !isTab2Open) {
      // If Tab1 is open, toggle between Tab1 and Tab2
      setIsTab1Open(!isTab1Open);
    } else if (isTab1Open && isTab2Open) {
      setIsTab1Open(true);
      setIsTab2Open(false);
    }
    // Tab2는 버튼 조작으로 열리지 않고, Tab1 내부의 특정 동작에 의해 열림.
  };

  // Tab1에서 Tab2를 열기 위한 함수
  const handleOpenTab2 = () => {
    setIsTab2Open(true);
  };

  // DS (District Selected 시)
  const [isTab1_DSOpen, setIsTab1_DSOpen] = useState(false);
  const [isTab2_DSOpen, setIsTab2_DSOpen] = useState(false);

  const handleToggleTab_DS = () => {
    if (!isTab1_DSOpen && !isTab2_DSOpen) {
      // If no tab is open, open Tab1
      setIsTab1_DSOpen(true);
    } else if (isTab1_DSOpen && !isTab2_DSOpen) {
      // If Tab1 is open, toggle between Tab1 and Tab2
      setIsTab1_DSOpen(!isTab1_DSOpen);
    } else if (isTab1_DSOpen && isTab2_DSOpen) {
      setIsTab1_DSOpen(true);
      setIsTab2_DSOpen(false);
    }
    // Tab2는 버튼 조작으로 열리지 않고, Tab1 내부의 특정 동작에 의해 열림.
  };

  // Tab1에서 Tab2를 열기 위한 함수
  const handleOpenTab2_DS = () => {
    setIsTab2_DSOpen(true);
  };

  useEffect(() => {
    // apiPlacesClick 값이 변경되면 Tab1_DS를 열거나 닫습니다.
    if (apiPlacesClick) {
      setIsTab1_DSOpen(true);
      setIsTab2_DSOpen(false);
    } else {
      setIsTab1_DSOpen(false);
    }
  }, [apiPlacesClick]);

  return (
    <div className="Main">
      <div className="tabContainer">
        <Nav />

        {/* Tab Component */}
        {isTab1Open && <Tab1 openTab2={handleOpenTab2} isTab2Open={isTab2Open} />}
        {isTab2Open && <Tab2 />}

        {/* DS */}
        {isTab1_DSOpen && <Tab1_DS openTab2_DS={handleOpenTab2_DS} isTab2_DSOpen={isTab2_DSOpen} />}
        {isTab2_DSOpen && <Tab2_DS />}

        {/* Button to show/hide the tab */}
        <button className="showTabButton" onClick={handleToggleTab}>
          <b>{isTab1Open ? '<' : '>'}</b>
        </button>

        {/* <button className="showTabButton" onClick={handleToggleTab_DS}>
          <b>{isTab1_DSOpen ? '<' : '>'}</b>
        </button> */}
      </div> {/* end of tab container */}

      <div>
        <KakaoMap2 />
      </div>
    </div>
  );
}

export default Main;