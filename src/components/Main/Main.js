
import React, { useState, useContext, useEffect } from 'react'
import './Main.css';
import Nav from '../NavBar/Nav';
import Tab1 from '../Tab1/Tab1';
import Tab2 from '../Tab2/Tab2';
import Tab1_DS from '../Tab1_DS/Tab1_DS';
import Tab2_DS from '../Tab2_DS/Tab2_DS';
import KakaoMap2 from '../../KakaoMap2';
import { MyContext } from '../../MyContextProvider'; // import the context

function Main() {
  const { apiPlacesClick, setApiPlacesClick} = useContext(MyContext); // Get the selectedLocations from the context

  const [isTab1Open, setIsTab1Open] = useState(false);
  const [isTab2Open, setIsTab2Open] = useState(false);

  //DS (District Selected 시)
  const [isTab1_DSOpen, setIsTab1_DSOpen] = useState(false);
  const [isTab2_DSOpen, setIsTab2_DSOpen] = useState(false);

  useEffect(() => {
    if (apiPlacesClick === false) {
      // 만약 selectedLocations 배열이 비어있다면
      setIsTab1Open(true); // Tab1을 열고
      setIsTab1_DSOpen(false); // Tab1_DS를 닫습니다.
      setIsTab2_DSOpen(false); // Tab1_DS를 닫습니다.
    } else if (apiPlacesClick === true && isTab2Open === false) {
      // selectedLocations 배열에 요소가 있고 Tab2가 닫혀있다면 (Tab2가 열려있을 때 Tab1_DS를 열지 않기 위함.)
      setIsTab1Open(false); // Tab1을 닫고
      setIsTab1_DSOpen(true); // Tab1_DS를 엽니다.
      
    }
  }, [apiPlacesClick]);

  // Tab1에서 Tab2를 열기 위한 함수
  const handleOpenTab2 = (groupData) => {
    setIsTab2Open(true);
  };

  // Tab1에서 Tab2를 열기 위한 함수
  const handleOpenTab2_DS = () => {
    setIsTab2_DSOpen(true);
  };

  const handleToggleTabs = () => {
    if (!isTab1Open && !isTab2Open && apiPlacesClick === false) {
      setIsTab1Open(true);
      setIsTab1_DSOpen(false);
      setIsTab2_DSOpen(false);
    } else if (isTab1Open && !isTab2Open) {
      setIsTab1Open(!isTab1Open);
      setApiPlacesClick(false);
    } else if (isTab1Open && isTab2Open) {
      setIsTab1Open(true);
      setIsTab2Open(false);
      setApiPlacesClick(false);
    }
    
    if (isTab1_DSOpen) {
      setIsTab1_DSOpen(!isTab1_DSOpen);
      setApiPlacesClick(false); // Tab1_DS가 닫힐 때 apiPlacesClick 값을 false로 변경
    }
  }



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
        <button className="showTabButton" onClick={handleToggleTabs}>
          <b>{isTab1Open || isTab1_DSOpen ? '<' : '>'}</b>
        </button>

      </div> {/* end of tab container */}

      <div>
        <KakaoMap2 />
      </div>

    </div>
  )
}

export default Main