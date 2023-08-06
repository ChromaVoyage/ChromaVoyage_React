/* Tab2_DS.js (DS for District Selected) */
// Tab2.js
import React, { useState, useEffect, useContext } from 'react';
import DaumPostcode from 'react-daum-postcode';
import './Tab2_DS.css'; // CSS 파일을 추가해줍니다.
import { MyContext } from '../../MyContextProvider';

const { kakao } = window;
var geocoder = new kakao.maps.services.Geocoder()

function Tab2_DS() {
  const [selectedAddress, setSelectedAddress] = useState('');
  const {selectedPlaces, setSelectedPlaces } = useContext(MyContext);
  const [selectedX, setSelectedX] = useState(0); // 선택한 x 좌표
  const [selectedY, setSelectedY] = useState(0); // 선택한 y 좌
  const [showDaumPostcode, setShowDaumPostcode] = useState(false); // 추가: Daum 우편번호 팝업 노출 여부 상태 변수

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const handleAddress = async (data) => {
    setShowDaumPostcode(false);
    const fullAddress = data.address;
    setSelectedAddress(fullAddress);
    console.log(data);

    try {
      // 주소를 좌표로 변환하는 API 호출
      const coords = await new Promise((resolve, reject) => {
        geocoder.addressSearch(fullAddress, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            resolve(result[0]);
          } else {
            reject(status);
          }
        });
      });

      // 좌표 정보를 가져와서 상태 업데이트
      const selectedX = coords.x; // 선택한 x 좌표
      const selectedY = coords.y; // 선택한 y 좌표
      const place = {
        address: fullAddress,
        x: selectedX,
        y: selectedY,
        // 추가적인 정보(예: 주소 등)를 객체에 추가할 수도 있습니다.
      };
      setSelectedPlaces((prev) => [...prev, place]);
      console.log(place);
    } catch (error) {
      console.error('주소를 좌표로 변환하는데 실패했습니다.', error);
    }
  };

  const handleAddressInputClick = () => {
    setShowDaumPostcode(true); // 주소 입력란 클릭 시 팝업을 띄우도록 설정
  };

  const handleDaumPostcodeClose = () => {
    setShowDaumPostcode(false);
  };
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
      <span className="Tab2Text">지도에서 선택 or 도로명 주소를 입력하세요.</span>
        <input
          type="text"
          className="Tab2Textbox"
          value={selectedAddress}
          onChange={handleAddressChange}
          onClick={handleAddressInputClick}
        />

        {/* Daum Postcode component */}
        {showDaumPostcode && (
          <div>
            <DaumPostcode
            onComplete={handleAddress}
            />
            <button onClick={handleDaumPostcodeClose}>x</button>
          </div>          
        )}

      <div className="Tab2_DSItem"><b>이미지</b></div>
    </div>
    </div>
  )
}

export default Tab2_DS
