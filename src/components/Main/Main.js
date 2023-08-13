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
  const { selectedLocations } = useContext(MyContext); // Get the selectedLocations from the context

  const [isTab1Open, setIsTab1Open] = useState(false);
  const [isTab2Open, setIsTab2Open] = useState(false);

  //DS (District Selected 시)
  const [isTab1_DSOpen, setIsTab1_DSOpen] = useState(false);
  const [isTab2_DSOpen, setIsTab2_DSOpen] = useState(false);

  useEffect(() => {
    if (selectedLocations.length === 0) {
      // 만약 selectedLocations 배열이 비어있다면
      setIsTab1Open(true); // Tab1을 열고
      setIsTab1_DSOpen(false); // Tab1_DS를 닫습니다.
      setIsTab2_DSOpen(false); // Tab1_DS를 닫습니다.
    } else if (selectedLocations.length !== 0 && isTab2Open === false) {
      // selectedLocations 배열에 요소가 있고 Tab2가 닫혀있다면 (Tab2가 열려있을 때 Tab1_DS를 열지 않기 위함.)
      setIsTab1Open(false); // Tab1을 닫고
      setIsTab1_DSOpen(true); // Tab1_DS를 엽니다.
    }
  }, [selectedLocations]);

  // Tab1에서 Tab2를 열기 위한 함수
  const handleOpenTab2 = (groupData) => {
    setIsTab2Open(true);
  };

  // Tab1에서 Tab2를 열기 위한 함수
  const handleOpenTab2_DS = () => {
    setIsTab2_DSOpen(true);
  };

  const handleToggleTabs = () => {
    //Tab2는 버튼 조작으로 열리지 않고, Tab1 내부의 특정 동작에 의해 열림.
    if (!isTab1Open && !isTab2Open && selectedLocations.length === 0) { // 아무 탭도 열려있지 않고, 지도에서 지역이 선택되어 있지 않을 때 버튼을 누르면 Tab1이 뜸.
      setIsTab1Open(true);
    } else if (isTab1Open && !isTab2Open) {
      // If Tab1 is open, toggle between Tab1 and Tab2
      setIsTab1Open(!isTab1Open);
    } else if (isTab1Open && isTab2Open) {
      setIsTab1Open(true);
      setIsTab2Open(false);
    }

    if (!isTab1_DSOpen && !isTab2_DSOpen && selectedLocations.length !== 0) {
      // 아무 탭도 열려있지 않고, 지도에서 지역이 선택되어 있을 때 버튼을 누르면 Tab1_DS이 뜸.
      setIsTab1_DSOpen(true);
    } else if (isTab1_DSOpen && !isTab2_DSOpen) {
      // If Tab1_DS is open, toggle between Tab1_DS and Tab2_DS
      setIsTab1_DSOpen(!isTab1_DSOpen);
    } else if (isTab1_DSOpen && isTab2_DSOpen) {
      setIsTab1_DSOpen(true);
      setIsTab2_DSOpen(false);
    }
  }

  const [isKakaoMapClick, setIsKakaoMapClick] = useState(false);

  // 카카오 맵 클릭 이벤트를 처리하는 함수
  const handleKakaoMapClick = () => {
    if (isTab1_DSOpen) {
      setIsTab1_DSOpen(false);
      setIsKakaoMapClick(false);
    } else {
      setIsTab1_DSOpen(true);
      setIsKakaoMapClick(true);
    }
  };


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
