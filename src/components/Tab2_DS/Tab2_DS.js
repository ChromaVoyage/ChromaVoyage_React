/* Tab2_DS.js (DS for District Selected) */
// Tab2.js
import React, { useState, useEffect, useContext } from 'react';
import './Tab2_DS.css'; // CSS 파일을 추가해줍니다.
import MapComponent from '../../MapComponent';
import ImageComponent from './ImageComponent';

const { kakao } = window;
var geocoder = new kakao.maps.services.Geocoder()

function Tab2_DS() {
  return (
    <div>
      <div className="Tab2_DS">
      {/* 사이드 메뉴 아이템들을 추가합니다 */}
      <div className="Tab2_DSItem"><b>일정</b></div>
      
      <div className="Tab2_DSContents">
        <span className="Tab2_DSText">일정</span>
      </div>

      <div className="Tab2_DSItem"><b>지역</b></div>
      {/* <span className="Tab2_DSText">지도에서 선택 or 도로명 주소를 입력하세요.</span> */}


      <div className="Tab2_DSItem"><b>장소</b></div>
      <span className="Tab2Text"> 장소명 또는 주소를 입력하세요. </span>
        <div>
          <MapComponent/>
        </div>

      <div className="ImageComponentContainer">
      <ImageComponent />
      </div>
    </div>
    </div>
  )
}

export default Tab2_DS
