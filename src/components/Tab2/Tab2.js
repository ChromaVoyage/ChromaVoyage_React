// Tab2.js
import React, { useState, useContext, useEffect } from 'react';
import './Tab2.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';
import DaumPostcode from 'react-daum-postcode';
import { MyContext } from '../../MyContextProvider';

function Tab2() {
  const { name, setName, selectedLocations, setSelectedLocations, searchAddress, setSearchAddress } = useContext(MyContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [showDaumPostcode, setShowDaumPostcode] = useState(false); // 추가: Daum 우편번호 팝업 노출 여부 상태 변수

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const handleAddress = (data) => {
    setShowDaumPostcode(false); // 팝업이 닫히도록 설정
    const fullAddress = data.address;
    const addressArray = fullAddress.split(' '); // 주소를 공백 문자를 기준으로 분리하여 배열로 만듦
    const guAddress = addressArray[0] + " " + addressArray[1];
    const searchAddress = addressArray[0] + " " + addressArray[1]; // 구 단위 주소를 가져옴
    setSelectedAddress(guAddress); // 구 단위 주소를 선택된 주소로 설정
    
    console.log(guAddress);
    
    setSearchAddress(searchAddress);
    setSelectedLocations((prev) => [...prev, guAddress]);
  };

  const handleAddressInputClick = () => {
    setShowDaumPostcode(true); // 주소 입력란 클릭 시 팝업을 띄우도록 설정
  };

  const handleDaumPostcodeClose = () => {
    setShowDaumPostcode(false);
  };

  const handleMapButtonClick = () => {
    // 지도에서 선택한 지역을 리스트에 추가합니다.
    // setSelectedLocations([...selectedLocations, name]);
    console.log("선택된 지역:", [selectedLocations]);
    console.log('지역이 추가됨');
  };

  useEffect(() => {
    // 선택된 모든 지역을 리스트로 저장하고 화면에 출력합니다.
    console.log('선택된 모든 지역:', selectedLocations);
  }, [selectedLocations]);

  return (
    <div>
      <div className="Tab2">
        <div className="Tab2Item"><b>일정 추가</b></div>

        <div className="Tab2Contents">
          <span className="Tab2Text">방문 일정을 선택하세요.</span>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            placeholderText="YYMMDD 형식으로 입력 (ex. 230713)"
            dateFormat="yyMMdd"
            className="Tab2Textbox"
          />
        </div>

        <div className="Tab2Item"><b>지역 추가</b></div>
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

        <div style={{ paddingTop: '10px' }}>
          선택된 지역:
          <ul>
            {selectedLocations.map((location, index) => (
              <li key={index}>{location}</li>
            ))}
          </ul>
        </div>

        <button onClick={handleMapButtonClick} className="MapSelectButton">
          일정 추가하기
        </button>

      </div>
    </div>
  )
}

export default Tab2;